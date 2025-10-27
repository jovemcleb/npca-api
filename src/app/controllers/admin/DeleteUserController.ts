import { FastifyRequest } from "fastify";
import { DeleteUserInput } from "../../../main/schemas/deleteUserSchema";
import { UserNotFound } from "../../errors/UserNotFound";
import { Controller } from "../../types/Controller";
import { DeleteUserUseCase } from "../../useCases/admin/DeleteUserUseCase";

export class DeleteUserController
  implements Controller<{ Params: DeleteUserInput }>
{
  constructor(private readonly deleteUserUseCase: DeleteUserUseCase) {}

  public async handle(request: FastifyRequest<{ Params: DeleteUserInput }>) {
    try {
      const { userId } = request.params;

      const result = await this.deleteUserUseCase.execute(userId);

      return {
        statusCode: 200,
        body: {
          message: "User deleted successfully",
          user: {
            id: result.user?.id,
            name: result.user?.name,
            email: result.user?.email,
          },
        },
      };
    } catch (error) {
      console.log(error);

      if (error instanceof UserNotFound) {
        return {
          statusCode: 404,
          body: {
            error: "User not found",
          },
        };
      }

      return {
        statusCode: 500,
        body: {
          error: "Internal Server Error",
        },
      };
    }
  }
}

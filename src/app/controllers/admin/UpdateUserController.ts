import { FastifyRequest } from "fastify";
import {
  UpdateUserBody,
  UpdateUserParams,
} from "../../../main/schemas/updateUserSchema";
import { UserNotFound } from "../../errors/UserNotFound";
import { Controller } from "../../types/Controller";
import { UpdateUserUseCase } from "../../useCases/admin/UpdateUserUseCase";

export class UpdateUserController
  implements Controller<{ Params: UpdateUserParams; Body: UpdateUserBody }>
{
  constructor(private readonly updateUserUseCase: UpdateUserUseCase) {}

  public async handle(
    request: FastifyRequest<{ Params: UpdateUserParams; Body: UpdateUserBody }>
  ) {
    try {
      const { userId } = request.params;
      const updateData = request.body;

      const result = await this.updateUserUseCase.execute(userId, updateData);

      return {
        statusCode: 200,
        body: {
          message: "User updated successfully",
          user: {
            id: result.user?.id,
            name: result.user?.name,
            email: result.user?.email,
            institution: result.user?.institution,
            course: result.user?.course,
            roles: result.user?.roles,
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

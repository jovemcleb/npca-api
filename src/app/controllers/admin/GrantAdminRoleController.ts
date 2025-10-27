import { FastifyRequest } from "fastify";
import { GrantAdminRoleInput } from "../../../main/schemas/grantAdminRoleSchema";
import { UserAlreadyAdmin } from "../../errors/UserAlreadyAdmin";
import { UserNotFound } from "../../errors/UserNotFound";
import { Controller } from "../../types/Controller";
import { GrantAdminRoleUseCase } from "../../useCases/admin/GrantAdminRoleUseCase";

export class GrantAdminRoleController
  implements Controller<{ Body: GrantAdminRoleInput }>
{
  constructor(private readonly grantAdminRoleUseCase: GrantAdminRoleUseCase) {}

  public async handle(request: FastifyRequest<{ Body: GrantAdminRoleInput }>) {
    try {
      const { userId } = request.body;

      const result = await this.grantAdminRoleUseCase.execute(userId);

      return {
        statusCode: 200,
        body: {
          message: "Admin role granted successfully",
          user: {
            id: result.user?.id,
            name: result.user?.name,
            email: result.user?.email,
            roles: result.user?.roles,
          },
        },
      };
    } catch (error) {

      if (error instanceof UserNotFound) {
        return {
          statusCode: 404,
          body: {
            error: "User not found",
          },
        };
      }

      if (error instanceof UserAlreadyAdmin) {
        return {
          statusCode: 400,
          body: {
            error: "User already has admin role",
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

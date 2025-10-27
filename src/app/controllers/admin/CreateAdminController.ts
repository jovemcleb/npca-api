import { FastifyRequest } from "fastify";
import { CreateAdminInput } from "../../../main/schemas/createAdminSchema";
import { AccountAlreadyExists } from "../../errors/AccountAlreadyExists";
import { InvalidRoles } from "../../errors/InvalidRoles";
import { Controller } from "../../types/Controller";
import { CreateAdminUseCase } from "../../useCases/admin/CreateAdminUseCase";

export class CreateAdminController
  implements Controller<{ Body: CreateAdminInput }>
{
  constructor(private readonly createAdminUseCase: CreateAdminUseCase) {}

  async handle(request: FastifyRequest<{ Body: CreateAdminInput }>) {
    try {
      const { name, email, password, institution, course, roles } =
        request.body;

      const admin = await this.createAdminUseCase.execute({
        name,
        email,
        password,
        institution,
        course,
        roles,
      });

      return { statusCode: 201, body: admin };
    } catch (error) {
      if (error instanceof AccountAlreadyExists) {
        return {
          statusCode: 409,
          body: {
            error: "Existing admin account with this email",
          },
        };
      }

      if (error instanceof InvalidRoles) {
        return {
          statusCode: 400,
          body: {
            error: "Invalid roles for admin account",
          },
        };
      }

      return {
        statusCode: 500,
        body: {
          error,
        },
      };
    }
  }
}

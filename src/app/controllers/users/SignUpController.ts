import { FastifyRequest } from "fastify";
import { AccountAlreadyExists } from "../../errors/AccountAlreadyExists";
import { Controller } from "../../types/Controller";
import { SignUpInput } from "../../types/User";
import { UserUseCases } from "../../useCases/UserUseCases";

export class SignUpController implements Controller<{ Body: SignUpInput }> {
  constructor(private readonly userUseCases: UserUseCases) {}

  public async handle(request: FastifyRequest<{ Body: SignUpInput }>) {
    try {
      const { name, email, password, institution, course } = request.body;

      const user = await this.userUseCases.signUp({
        name,
        email,
        password,
        institution,
        course,
      });

      return {
        statusCode: 201,
        body: {
          user,
        },
      };
    } catch (error) {
      console.log(error);

      if (error instanceof AccountAlreadyExists) {
        return {
          statusCode: 409,
          body: {
            error: "Email already in use",
          },
        };
      }

      return {
        statusCode: 500,
        body: {
          error:
            error instanceof Error ? error.message : "Internal server error",
        },
      };
    }
  }
}

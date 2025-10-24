import { FastifyRequest } from "fastify";
import { InvalidCredentials } from "../../errors/InvalidCredentials";
import { Controller } from "../../types/Controller";
import { SignInInput } from "../../types/User";
import { SignInUseCase } from "../../useCases/user/SignInUseCase";

export class SignInController
  implements Controller<{ Body: { email: string; password: string } }>
{
  constructor(private readonly signInUseCase: SignInUseCase) {}

  public async handle(request: FastifyRequest<{ Body: SignInInput }>) {
    try {
      const { email, password } = request.body;

      const { token } = await this.signInUseCase.execute({ email, password });

      return { statusCode: 200, body: { token } };
    } catch (error) {
      if (error instanceof InvalidCredentials) {
        return {
          statusCode: 401,
          body: {
            error: "Invalid credentials",
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

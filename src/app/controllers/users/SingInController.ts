import { FastifyRequest } from "fastify";
import { SignInInput } from "../../../main/schemas/signInSchema";
import { InvalidCredentials } from "../../errors/InvalidCredentials";
import { Controller } from "../../types/Controller";
import { SignInUseCase } from "../../useCases/user/SignInUseCase";

export class SignInController implements Controller<{ Body: SignInInput }> {
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
          error,
        },
      };
    }
  }
}

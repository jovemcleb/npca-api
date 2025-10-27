import { FastifyRequest } from "fastify";
import { SignUpInput } from "../../../main/schemas/signUpSchema";
import { AccountAlreadyExists } from "../../errors/AccountAlreadyExists";
import { Controller } from "../../types/Controller";
import { SignUpUseCase } from "../../useCases/user/SignUpUseCase";

export class SignUpController implements Controller<{ Body: SignUpInput }> {
  constructor(private readonly signUpUseCase: SignUpUseCase) {}

  public async handle(request: FastifyRequest<{ Body: SignUpInput }>) {
    try {
      const { 
        name, 
        email, 
        password, 
        institution, 
        course,
        description,
        articles,
        projects 
      } = request.body;

      const user = await this.signUpUseCase.execute({
        name,
        email,
        password,
        institution,
        course,
        description,
        articles,
        projects,
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
          error,
        },
      };
    }
  }
}

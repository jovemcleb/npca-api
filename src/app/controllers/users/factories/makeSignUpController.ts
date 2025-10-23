import { FastifyInstance } from "fastify";
import { makeUserUseCase } from "../../../useCases/factories/makeUserUseCase";
import { SignUpController } from "../SignUpController";

export function makeSignUpController(fastify: FastifyInstance) {
  const userUseCases = makeUserUseCase(fastify);

  return new SignUpController(userUseCases);
}

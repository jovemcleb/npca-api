import { FastifyInstance } from "fastify";
import { makeUserUseCase } from "../../../useCases/factories/makeUserUseCase";
import { SignInController } from "../SingInController";

export function makeSignInController(fastify: FastifyInstance) {
  const userUseCases = makeUserUseCase(fastify);
  return new SignInController(userUseCases);
}

import { FastifyInstance } from "fastify";
import { makeSignInUseCase } from "../../../useCases/user/factories/makeSigInUseCase";
import { SignInController } from "../SingInController";

export function makeSignInController(fastify: FastifyInstance) {
  const signInUseCase = makeSignInUseCase(fastify);

  return new SignInController(signInUseCase);
}

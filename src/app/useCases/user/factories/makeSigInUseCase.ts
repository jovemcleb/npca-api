import { FastifyInstance } from "fastify";
import { makeUserRepository } from "../../../../infra/repositories/factories/makeUserRepository";
import { JwtAdapter } from "../../../../main/adapters/JwtAdapter";
import { SignInUseCase } from "../SignInUseCase";

export function makeSignInUseCase(fastify: FastifyInstance) {
  const userRepository = makeUserRepository();
  const jwtAdapter = new JwtAdapter(fastify);

  return new SignInUseCase(userRepository, jwtAdapter);
}

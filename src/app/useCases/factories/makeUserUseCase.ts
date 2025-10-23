import { FastifyInstance } from "fastify";
import { makeUserRepository } from "../../../infra/repositories/factories/makeUserRepository";
import { JwtAdapter } from "../../../main/adapters/JwtAdapter";
import { UserUseCases } from "../UserUseCases";

export function makeUserUseCase(fastify: FastifyInstance) {
  const userRepository = makeUserRepository();
  const jwtAdapter = new JwtAdapter(fastify);

  return new UserUseCases(userRepository, jwtAdapter);
}

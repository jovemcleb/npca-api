import { makeUserRepository } from "../../../../infra/repositories/factories/makeUserRepository";
import { DeleteUserUseCase } from "../DeleteUserUseCase";

export function makeDeleteUserUseCase() {
  const userRepository = makeUserRepository();
  return new DeleteUserUseCase(userRepository);
}

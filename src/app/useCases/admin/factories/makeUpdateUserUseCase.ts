import { makeUserRepository } from "../../../../infra/repositories/factories/makeUserRepository";
import { UpdateUserUseCase } from "../UpdateUserUseCase";

export function makeUpdateUserUseCase() {
  const userRepository = makeUserRepository();
  return new UpdateUserUseCase(userRepository);
}

import { makeUserRepository } from "../../../../infra/repositories/factories/makeUserRepository";
import { SignUpUseCase } from "../SignUpUseCase";

export function makeSignUpUseCase() {
  const userRepository = makeUserRepository();

  return new SignUpUseCase(userRepository);
}

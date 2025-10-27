import { UserRepository } from "../../../../infra/repositories/UserRepository";
import { CreateAdminUseCase } from "../CreateAdminUseCase";

export function makeCreateAdminUseCase() {
  const userRepository = new UserRepository();

  return new CreateAdminUseCase(userRepository);
}

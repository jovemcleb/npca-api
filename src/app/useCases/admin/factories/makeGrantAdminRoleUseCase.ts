import { makeUserRepository } from "../../../../infra/repositories/factories/makeUserRepository";
import { GrantAdminRoleUseCase } from "../GrantAdminRoleUseCase";

export function makeGrantAdminRoleUseCase() {
  const userRepository = makeUserRepository();
  return new GrantAdminRoleUseCase(userRepository);
}

import { UserModel } from "../../models/User";
import { UserRepository } from "../UserRepository";

export function makeUserRepository() {
  return new UserRepository(UserModel);
}

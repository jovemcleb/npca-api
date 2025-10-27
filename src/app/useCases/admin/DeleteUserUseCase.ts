import { UserRepository } from "../../../infra/repositories/UserRepository";
import { UserNotFound } from "../../errors/UserNotFound";

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  public async execute(userId: string) {
    const result = await this.userRepository.deleteUser(userId);

    if (!result.user) {
      throw new UserNotFound();
    }

    return result;
  }
}

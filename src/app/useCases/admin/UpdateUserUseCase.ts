import { hash } from "argon2";
import { UserRepository } from "../../../infra/repositories/UserRepository";
import { UpdateUserBody } from "../../../main/schemas/updateUserSchema";
import { UserNotFound } from "../../errors/UserNotFound";

export class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  public async execute(userId: string, updateData: UpdateUserBody) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UserNotFound();
    }

    const dataToUpdate = { ...updateData };

    if (dataToUpdate.password) {
      dataToUpdate.password = await hash(dataToUpdate.password);
    }

    const result = await this.userRepository.updateUser(userId, dataToUpdate);

    if (!result.user) {
      throw new UserNotFound();
    }

    return result;
  }
}

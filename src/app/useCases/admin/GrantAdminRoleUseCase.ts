import { UserRole } from "../../../infra/models/User";
import { UserRepository } from "../../../infra/repositories/UserRepository";
import { UserAlreadyAdmin } from "../../errors/UserAlreadyAdmin";
import { UserNotFound } from "../../errors/UserNotFound";

export class GrantAdminRoleUseCase {
  constructor(private userRepository: UserRepository) {}

  public async execute(userId: string) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UserNotFound();
    }

    if (user.roles.includes(UserRole.ADMIN)) {
      throw new UserAlreadyAdmin();
    }

    const updatedRoles = [...user.roles, UserRole.ADMIN];

    const updatedUser = await this.userRepository.updateUser(userId, {
      roles: updatedRoles,
    });

    if (!updatedUser.user) {
      throw new UserNotFound();
    }

    return updatedUser;
  }
}

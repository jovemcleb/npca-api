import { UserRole } from "../../../infra/models/User";
import { UserRepository } from "../../../infra/repositories/UserRepository";
import { AccountAlreadyExists } from "../../errors/AccountAlreadyExists";
import { InvalidRoles } from "../../errors/InvalidRoles";
import { CreateAdminInput } from "../../types/Admin";

export class CreateAdminUseCase {
  constructor(private userRepository: UserRepository) {}

  public async execute(adminData: CreateAdminInput) {
    const existingAdmin = await this.userRepository.findOne({
      email: adminData.email,
    });

    if (existingAdmin) {
      throw new AccountAlreadyExists();
    }

    if (!adminData.roles.includes(UserRole.ADMIN)) {
      throw new InvalidRoles();
    }

    const { id } = await this.userRepository.createUser(adminData);

    return { id };
  }
}

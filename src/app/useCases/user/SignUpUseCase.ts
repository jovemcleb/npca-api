import { hash } from "argon2";
import { UserRepository } from "../../../infra/repositories/UserRepository";
import { AccountAlreadyExists } from "../../errors/AccountAlreadyExists";
import { SignUpInput } from "../../types/User";

export class SignUpUseCase {
  constructor(private userRepository: UserRepository) {}

  public async execute(user: SignUpInput) {
    const { name, email, password, institution, course } = user;

    const userExists = await this.userRepository.findOne({ email });

    console.log(userExists);

    if (userExists) {
      throw new AccountAlreadyExists();
    }

    const hashedPassword = await hash(password);

    const newUser = await this.userRepository.createUser({
      name,
      email,
      password: hashedPassword,
      institution,
      course,
    });

    return newUser;
  }
}

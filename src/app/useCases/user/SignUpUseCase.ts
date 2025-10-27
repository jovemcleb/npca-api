import { hash } from "argon2";
import { UserRepository } from "../../../infra/repositories/UserRepository";
import { SignUpInput } from "../../../main/schemas/signUpSchema";
import { AccountAlreadyExists } from "../../errors/AccountAlreadyExists";

export class SignUpUseCase {
  constructor(private userRepository: UserRepository) {}

  public async execute(user: SignUpInput) {
    const { 
      name, 
      email, 
      password, 
      institution, 
      course,
      description,
      articles,
      projects 
    } = user;

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
      ...(description && { description }),
      ...(articles && { articles }),
      ...(projects && { projects }),
    });

    return newUser;
  }
}

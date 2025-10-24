import { hash, verify } from "argon2";
import { UserRepository } from "../../infra/repositories/UserRepository";
import { JwtAdapter } from "../../main/adapters/JwtAdapter";
import { AccountAlreadyExists } from "../errors/AccountAlreadyExists";
import { InvalidCredentials } from "../errors/InvalidCredentials";
import { SignInInput, SignUpInput } from "../types/User";

export class UserUseCases {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtAdapter: JwtAdapter
  ) {}

  public async signIn(credentials: SignInInput) {
    const { email, password } = credentials;

    const user = await this.userRepository.findOneWithPassword({ email });

    if (!user) {
      throw new InvalidCredentials();
    }

    const isValidPassword = await verify(user.password, password);

    if (!isValidPassword) {
      throw new InvalidCredentials();
    }

    const token = this.jwtAdapter.sign(
      { account: { id: user.id, role: user.roles } },
      { expiresIn: "1d" }
    );

    return { token };
  }

  public async signUp(user: SignUpInput) {
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

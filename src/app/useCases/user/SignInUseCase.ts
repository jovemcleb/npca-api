import { verify } from "argon2";
import { UserRepository } from "../../../infra/repositories/UserRepository";
import { JwtAdapter } from "../../../main/adapters/JwtAdapter";
import { InvalidCredentials } from "../../errors/InvalidCredentials";
import { SignInInput } from "../../types/User";

export class SignInUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtAdapter: JwtAdapter
  ) {}

  public async execute(credentials: SignInInput) {
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
}

import { makeSignUpUseCase } from "../../../useCases/user/factories/makeSignUpUseCase";
import { SignUpController } from "../SignUpController";

export function makeSignUpController() {
  const signUpUseCase = makeSignUpUseCase();

  return new SignUpController(signUpUseCase);
}

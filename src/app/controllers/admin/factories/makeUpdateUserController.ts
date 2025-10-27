import { makeUpdateUserUseCase } from "../../../useCases/admin/factories/makeUpdateUserUseCase";
import { UpdateUserController } from "../UpdateUserController";

export function makeUpdateUserController() {
  const updateUserUseCase = makeUpdateUserUseCase();
  return new UpdateUserController(updateUserUseCase);
}

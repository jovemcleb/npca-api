import { makeDeleteUserUseCase } from "../../../useCases/admin/factories/makeDeleteUserUseCase";
import { DeleteUserController } from "../DeleteUserController";

export function makeDeleteUserController() {
  const deleteUserUseCase = makeDeleteUserUseCase();
  return new DeleteUserController(deleteUserUseCase);
}

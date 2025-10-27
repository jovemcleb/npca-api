import { makeCreateAdminUseCase } from "../../../useCases/admin/factories/makeCreateAdminUseCase";
import { CreateAdminController } from "../CreateAdminController";

export function makeCreateAdminController() {
  const createAdminUseCase = makeCreateAdminUseCase();

  return new CreateAdminController(createAdminUseCase);
}

import { makeGrantAdminRoleUseCase } from "../../../useCases/admin/factories/makeGrantAdminRoleUseCase";
import { GrantAdminRoleController } from "../GrantAdminRoleController";

export function makeGrantAdminRoleController() {
  const grantAdminRoleUseCase = makeGrantAdminRoleUseCase();
  return new GrantAdminRoleController(grantAdminRoleUseCase);
}

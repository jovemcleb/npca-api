import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { makeCreateAdminController } from "../../app/controllers/admin/factories/makeCreateAdminController";
import { makeDeleteUserController } from "../../app/controllers/admin/factories/makeDeleteUserController";
import { makeGrantAdminRoleController } from "../../app/controllers/admin/factories/makeGrantAdminRoleController";
import { makeUpdateUserController } from "../../app/controllers/admin/factories/makeUpdateUserController";
import { UserRole } from "../../infra/models/User";
import { routeAdapter } from "../adapters/routeAdapter";
import {
  CreateAdminInput,
  createAdminSchema,
} from "../schemas/createAdminSchema";
import { DeleteUserInput, deleteUserSchema } from "../schemas/deleteUserSchema";
import {
  GrantAdminRoleInput,
  grantAdminRoleSchema,
} from "../schemas/grantAdminRoleSchema";
import {
  UpdateUserBody,
  UpdateUserParams,
  updateUserSchema,
} from "../schemas/updateUserSchema";

export const adminRoutes: FastifyPluginAsync = async (
  fastify: FastifyInstance
) => {
  fastify.post<{ Body: CreateAdminInput }>(
    "/create-admin",
    {
      schema: createAdminSchema,
      preHandler: [fastify.authenticate, fastify.authorize([UserRole.ADMIN])],
    },
    routeAdapter(makeCreateAdminController())
  );

  fastify.post<{ Body: GrantAdminRoleInput }>(
    "/grant-admin-role",
    {
      schema: grantAdminRoleSchema,
      preHandler: [fastify.authenticate, fastify.authorize([UserRole.ADMIN])],
    },
    routeAdapter(makeGrantAdminRoleController())
  );

  fastify.delete<{ Params: DeleteUserInput }>(
    "/delete-user/:userId",
    {
      schema: deleteUserSchema,
      preHandler: [fastify.authenticate, fastify.authorize([UserRole.ADMIN])],
    },
    routeAdapter(makeDeleteUserController())
  );

  fastify.patch<{ Params: UpdateUserParams; Body: UpdateUserBody }>(
    "/update-user/:userId",
    {
      schema: updateUserSchema,
      preHandler: [fastify.authenticate, fastify.authorize([UserRole.ADMIN])],
    },
    routeAdapter(makeUpdateUserController())
  );
};

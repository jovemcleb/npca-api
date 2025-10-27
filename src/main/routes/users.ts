import { FastifyInstance, FastifyPluginAsync } from "fastify";

import { makeCreateAdminController } from "../../app/controllers/admin/factories/makeCreateAdminController";
import { makeSignInController } from "../../app/controllers/users/factories/makeSignInController";
import { makeSignUpController } from "../../app/controllers/users/factories/makeSignUpController";
import { UserRole } from "../../infra/models/User";
import { routeAdapter } from "../adapters/routeAdapter";
import {
  CreateAdminInput,
  createAdminSchema,
} from "../schemas/createAdminSchema";
import { signInSchema } from "../schemas/signInSchema";
import { signUpSchema } from "../schemas/signUpSchema";

export const userRoutes: FastifyPluginAsync = async (
  fastify: FastifyInstance
) => {
  fastify.post(
    "/signup",
    { schema: signUpSchema },
    routeAdapter(makeSignUpController())
  );

  fastify.post(
    "/signin",
    { schema: signInSchema },
    routeAdapter(makeSignInController(fastify))
  );

  fastify.post<{ Body: CreateAdminInput }>(
    "/create-admin",
    {
      schema: createAdminSchema,
      preHandler: [fastify.authenticate, fastify.authorize([UserRole.ADMIN])],
    },
    routeAdapter(makeCreateAdminController())
  );
};

import { FastifyInstance, FastifyPluginAsync } from "fastify";

import { makeSignInController } from "../../app/controllers/users/factories/makeSignInController";
import { makeSignUpController } from "../../app/controllers/users/factories/makeSignUpController";
import { routeAdapter } from "../adapters/routeAdapter";
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
};

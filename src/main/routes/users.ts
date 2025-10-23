import { FastifyInstance, FastifyPluginAsync } from "fastify";

import { makeSignUpController } from "../../app/controllers/users/factories/makeSignUpController";
import { routeAdapter } from "../adapters/routeAdapter";
import { signUpSchema } from "../schemas/signUpSchema";

export const userRoutes: FastifyPluginAsync = async (
  fastify: FastifyInstance
) => {
  const signUpController = makeSignUpController(fastify);

  fastify.post(
    "/signup",
    { schema: signUpSchema },
    routeAdapter(signUpController)
  );
};

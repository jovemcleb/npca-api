import { FastifyInstance, FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { userRoutes } from "./users";

const routes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.register(userRoutes);
};

export const routesPlugin = fp(routes, {
  name: "routes-plugin",
  dependencies: ["mongoose-plugin"],
});

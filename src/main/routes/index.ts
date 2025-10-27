import { FastifyInstance, FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { adminRoutes } from "./admin";
import { userRoutes } from "./users";

const routes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.register(userRoutes);
  fastify.register(adminRoutes);
};

export const routesPlugin = fp(routes, {
  name: "routes-plugin",
  dependencies: ["mongoose-plugin"],
});

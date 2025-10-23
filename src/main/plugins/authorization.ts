import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import fp from "fastify-plugin";
import { UserRole } from "../../infra/models/User";

const authorization: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.decorate("authorize", (allowedRoles: UserRole[]) => {
    return async (request: FastifyRequest, reply: FastifyReply) => {
      if (!request.user.account) {
        return reply.status(403).send({
          statusCode: 403,
          body: { error: "Acesso negado" },
        });
      }

      const userRole = request.user.account.role;

      if (!allowedRoles.includes(userRole)) {
        return reply.status(403).send({
          statusCode: 403,
          body: { error: "Acesso negado" },
        });
      }
    };
  });
};

export const authorizationPlugin = fp(authorization, {
  name: "authorization-plugin",
  dependencies: ["authenticate-plugin"],
});

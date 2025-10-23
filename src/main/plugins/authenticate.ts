import fastifyJwt from "@fastify/jwt";
import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import fp from "fastify-plugin";
import { ENV } from "../../infra/config/env";

const authentication: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  if (!ENV.jwtSecret) {
    fastify.log.warn("JWT_SECRET não foi definido nas variaveis de ambiente");
    throw new Error("JWT_SECRET nao foi definido");
  }

  fastify.register(fastifyJwt, {
    secret: ENV.jwtSecret,
    sign: { expiresIn: "1d" },
  });

  fastify.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
          return reply.status(401).send({
            error: "Token não encontrado",
          });
        }

        if (!authHeader.startsWith("Bearer ")) {
          return reply.status(401).send({
            error: "Formato de token inválido",
          });
        }

        await request.jwtVerify();
      } catch (error) {
        request.log.warn({ error }, "Erro ao validar token JWT");

        return reply.status(401).send({
          statusCode: 401,
          error: { error: "Acesso com token inválido" },
        });
      }
    }
  );
};

export const authenticationPlugin = fp(authentication, {
  name: "authenticate-plugin",
});

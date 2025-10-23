import { FastifyReply, FastifyRequest, RouteGenericInterface } from "fastify";
import { Controller } from "../../app/types/Controller";

export function routeAdapter<TRoute extends RouteGenericInterface>(
  controller: Controller<TRoute>
) {
  return async (request: FastifyRequest<TRoute>, reply: FastifyReply) => {
    const { statusCode, body } = await controller.handle(request);

    return reply.status(statusCode).send(body);
  };
}

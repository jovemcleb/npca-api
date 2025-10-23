import { FastifyRequest, RouteGenericInterface } from "fastify";

export type Response = {
  statusCode: number;
  body: Record<string, any>;
};

export type Controller<
  TRoute extends RouteGenericInterface = RouteGenericInterface
> = {
  handle: (request: FastifyRequest<TRoute>) => Promise<Response>;
};

import { FastifyRequest, RouteGenericInterface } from "fastify";

export type Response = {
  statusCode: number;
  body: Record<string, any>;
};

export abstract class Controller<
  TRoute extends RouteGenericInterface = RouteGenericInterface
> {
  abstract handle(request: FastifyRequest<TRoute>): Promise<Response>;
}

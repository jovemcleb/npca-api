import fastifySwagger from "@fastify/swagger";
import scalarAPIReference from "@scalar/fastify-api-reference";
import { fastify as Fastify } from "fastify";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { authenticationPlugin } from "./plugins/authenticate";
import { authorizationPlugin } from "./plugins/authorization";
import mongoosePlugin from "./plugins/mongoose";
import { routesPlugin } from "./routes";

const fastify = Fastify({
  logger:
    process.env.NODE_ENV !== "test"
      ? {
          transport: {
            target: "pino-pretty",
            options: {
              colorize: true,
              translateTime: "HH:MM:ss Z",
              ignore: "pid,hostname",
            },
          },
        }
      : false,
}).withTypeProvider<ZodTypeProvider>();

if (process.env.NODE_ENV === "development") {
  fastify.register(fastifySwagger, {
    openapi: {
      info: {
        title: "NPCA API",
        version: "1.0.0",
      },
    },
    transform: jsonSchemaTransform,
  });

  fastify.register(scalarAPIReference, {
    routePrefix: "/docs",
    configuration: {
      theme: "kepler",
    },
  });
}

fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);

fastify.register(authenticationPlugin);
fastify.register(authorizationPlugin);

fastify.register(mongoosePlugin);
fastify.register(routesPlugin);

export { fastify };

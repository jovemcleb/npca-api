import "dotenv/config";
import { fastify } from "./app";

fastify.listen({ port: 3000, host: "0.0.0.0" }).then(() => {
  fastify.log.info("Server is running on http://localhost:3000");
});

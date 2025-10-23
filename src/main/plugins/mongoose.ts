import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import mongoose from "mongoose";

export default fp(
  async (fastify: FastifyInstance) => {
    const url = process.env.MONGO_URL;

    if (!url) {
      throw new Error("MONGO_URL is not defined");
    }

    fastify.log.info(`Connecting to MongoDB: ${url.replace(/:.+@/, ":****@")}`);

    try {
      await mongoose.connect(url);
      fastify.log.info("MongoDB connected successfully");
    } catch (error) {
      fastify.log.error(error, "Failed to connect to MongoDB");
      throw error;
    }

    fastify.decorate("mongoose", mongoose);

    fastify.addHook("onClose", async () => {
      fastify.log.info("Disconnecting from MongoDB...");
      await mongoose.disconnect();
      fastify.log.info("MongoDB disconnected");
    });
  },
  {
    name: "mongoose-plugin",
  }
);

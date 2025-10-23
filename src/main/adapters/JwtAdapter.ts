import { SignPayloadType } from "@fastify/jwt";
import { FastifyInstance } from "fastify";

export class JwtAdapter implements JwtAdapter {
  constructor(private readonly fastify: FastifyInstance) {}

  sign(
    payload: SignPayloadType,
    options: { expiresIn?: string | number } = {}
  ): string {
    if (!this.fastify.jwt) {
      throw new Error("@fastify/jwt plugin not registered");
    }

    return this.fastify.jwt.sign(payload, options);
  }
}

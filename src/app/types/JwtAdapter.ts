import { SignPayloadType } from "@fastify/jwt";

export type JwtAdapter = {
  sign(
    payload: SignPayloadType,
    options?: { expiresIn?: string | number }
  ): string;
};

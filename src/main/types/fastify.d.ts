import "@fastify/jwt";
import "fastify";
import mongoose from "mongoose";
import { UserRole } from "../../app/models/User";

declare module "fastify" {
  interface FastifyInstance {
    mongoose: typeof mongoose;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: {
      account: {
        id: string;
        role: UserRole;
      };
    };
    user: {
      account: {
        id: string;
        role: UserRole;
      };
      iat: number;
      exp: number;
    };
  }
}

import mongoose from "mongoose";
import request from "supertest";
import { UserModel, UserRole } from "../../infra/models/User";
import { fastify } from "../../main/app";
import { makeUser } from "./makeUser";

export async function makeAdmin() {
  const { res, userData } = await makeUser();

  if (!res.body.user) {
    throw new Error(`Failed to create user via signup`);
  }

  const userId = res.body.user.id;

  const updatedUser = await UserModel.findByIdAndUpdate(
    new mongoose.Types.ObjectId(userId),
    {
      $set: { roles: [UserRole.ADMIN, UserRole.STUDENT] },
    },
    { new: true }
  );

  if (!updatedUser) {
    throw new Error(`Failed to update user roles for user ${userId}`);
  }

  const loginResponse = await request(fastify.server).post("/signin").send({
    email: userData.email,
    password: userData.password,
  });

  if (!loginResponse.body.token) {
    console.error("Login failed:", loginResponse.body);
    throw new Error("Failed to get admin token");
  }

  return {
    admin: {
      ...userData,
      id: userId,
    },
    token: loginResponse.body.token,
  };
}

export async function getAuthToken(email: string, password: string) {
  const response = await request(fastify.server)
    .post("/signin")
    .send({ email, password });

  return response.body.token;
}

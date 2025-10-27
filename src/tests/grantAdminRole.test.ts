import request from "supertest";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { UserRole } from "../infra/models/User";
import { fastify } from "../main/app";
import { makeAdmin } from "./factories/makeAdmin";
import { makeUser } from "./factories/makeUser";

describe("POST /grant-admin-role", () => {
  let adminToken: string;

  beforeAll(async () => {
    await fastify.ready();
  });

  beforeEach(async () => {
    const { token } = await makeAdmin();
    adminToken = token;
  });

  afterAll(async () => {
    await fastify.close();
  });

  it("deve conceder role de admin a um usuário com sucesso", async () => {
    const { res: userRes } = await makeUser();
    const userId = userRes.body.user.id;

    const response = await request(fastify.server)
      .post("/grant-admin-role")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ userId })
      .expect(200);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Admin role granted successfully");
    expect(response.body.user).toHaveProperty("roles");
    expect(response.body.user.roles).toContain(UserRole.ADMIN);
  });

  it("deve retornar erro 404 quando o usuário não existir", async () => {
    const fakeUserId = "507f1f77bcf86cd799439011";

    const response = await request(fastify.server)
      .post("/grant-admin-role")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ userId: fakeUserId })
      .expect(404);

    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("User not found");
  });

  it("deve retornar erro 400 quando o usuário já for admin", async () => {
    const { res: userRes } = await makeUser();
    const userId = userRes.body.user.id;

    await request(fastify.server)
      .post("/grant-admin-role")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ userId });

    const response = await request(fastify.server)
      .post("/grant-admin-role")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ userId })
      .expect(400);

    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("User already has admin role");
  });

  it("deve retornar erro 401 quando não houver autenticação", async () => {
    const { res: userRes } = await makeUser();
    const userId = userRes.body.user.id;

    await request(fastify.server)
      .post("/grant-admin-role")
      .send({ userId })
      .expect(401);
  });

  it("deve retornar erro 400 quando userId não for fornecido", async () => {
    const response = await request(fastify.server)
      .post("/grant-admin-role")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({})
      .expect(400);

    expect(response.body).toHaveProperty("error");
  });
});

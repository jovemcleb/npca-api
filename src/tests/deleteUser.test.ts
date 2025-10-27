import request from "supertest";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { fastify } from "../main/app";
import { makeAdmin } from "./factories/makeAdmin";
import { makeUser } from "./factories/makeUser";

describe("DELETE /delete-user/:userId", () => {
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

  it("deve deletar um usuário com sucesso", async () => {
    const { res: userRes } = await makeUser();
    const userId = userRes.body.user.id;

    const response = await request(fastify.server)
      .delete(`/delete-user/${userId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .expect(200);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("User deleted successfully");
    expect(response.body.user).toHaveProperty("id");
    expect(response.body.user.id).toBe(userId);
  });

  it("deve retornar erro 404 quando o usuário não existir", async () => {
    const fakeUserId = "507f1f77bcf86cd799439011";

    const response = await request(fastify.server)
      .delete(`/delete-user/${fakeUserId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .expect(404);

    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("User not found");
  });

  it("deve retornar erro 401 quando não houver autenticação", async () => {
    const { res: userRes } = await makeUser();
    const userId = userRes.body.user.id;

    await request(fastify.server).delete(`/delete-user/${userId}`).expect(401);
  });

  it("não deve ser possível deletar o mesmo usuário duas vezes", async () => {
    const { res: userRes } = await makeUser();
    const userId = userRes.body.user.id;

    await request(fastify.server)
      .delete(`/delete-user/${userId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .expect(200);

    const response = await request(fastify.server)
      .delete(`/delete-user/${userId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .expect(404);

    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("User not found");
  });
});

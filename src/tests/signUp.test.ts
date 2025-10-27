import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { fastify } from "../main/app";
import { buildUserData, makeUser } from "./factories/makeUser";

describe("POST /signup", () => {
  beforeAll(async () => {
    await fastify.ready();
  });

  afterAll(async () => {
    await fastify.close();
  });

  it("deve criar um novo usuário com sucesso", async () => {
    const userData = buildUserData();

    const response = await request(fastify.server)
      .post("/signup")
      .send(userData)
      .expect(201);

    expect(response.body).toHaveProperty("user");
    expect(response.body.user).toHaveProperty("id");
    expect(response.body.user.id).toBeTruthy();
  });

  it("deve retornar erro 400 quando o nome for muito curto", async () => {
    const userData = buildUserData({ name: "A" });

    const response = await request(fastify.server)
      .post("/signup")
      .send(userData)
      .expect(400);

    expect(response.body).toHaveProperty("message");
  });

  it("deve retornar erro 400 quando o email for inválido", async () => {
    const userData = buildUserData({ email: "email-invalido" });

    const response = await request(fastify.server)
      .post("/signup")
      .send(userData)
      .expect(400);

    expect(response.body).toHaveProperty("message");
  });

  it("deve retornar erro 400 quando a senha for muito curta", async () => {
    const userData = buildUserData({ password: "123" });

    const response = await request(fastify.server)
      .post("/signup")
      .send(userData)
      .expect(400);

    expect(response.body).toHaveProperty("message");
  });

  it("deve retornar erro 400 quando a instituição estiver faltando", async () => {
    const userData = buildUserData({ institution: "" });

    const response = await request(fastify.server)
      .post("/signup")
      .send(userData)
      .expect(400);

    expect(response.body).toHaveProperty("message");
  });

  it("deve retornar erro 400 quando o curso estiver faltando", async () => {
    const userData = buildUserData({ course: "" });

    const response = await request(fastify.server)
      .post("/signup")
      .send(userData)
      .expect(400);

    expect(response.body).toHaveProperty("message");
  });

  it("deve retornar erro 409 quando tentar criar usuário com email duplicado", async () => {
    const { userData } = await makeUser();

    const response = await request(fastify.server)
      .post("/signup")
      .send(userData)
      .expect(409);

    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Email already in use");
  });

  it("deve retornar erro 400 quando campos obrigatórios estiverem faltando", async () => {
    const response = await request(fastify.server)
      .post("/signup")
      .send({})
      .expect(400);

    expect(response.body).toHaveProperty("message");
  });
});

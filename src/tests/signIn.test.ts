import { faker } from "@faker-js/faker";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { fastify } from "../main/app";
import { makeUser } from "./factories/makeUser";

describe("POST /signin", () => {
  beforeAll(async () => {
    await fastify.ready();
  });

  afterAll(async () => {
    await fastify.close();
  });

  it("deve autenticar com credenciais válidas e retornar token", async () => {
    const user = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 8 }),
      institution: faker.company.name(),
      course: faker.person.jobTitle(),
    };

    const { userData } = await makeUser(user);

    const res = await request(fastify.server)
      .post("/signin")
      .send({ email: userData.email, password: userData.password })
      .expect(200);

    expect(res.body).toHaveProperty("token");
    expect(typeof res.body.token).toBe("string");
  });

  it("deve retornar 401 para senha inválida", async () => {
    const { userData } = await makeUser();

    const res = await request(fastify.server)
      .post("/signin")
      .send({ email: userData.email, password: "wrong-password" })
      .expect(401);

    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBe("Invalid credentials");
  });

  it("deve retornar 401 para usuário inexistente", async () => {
    const res = await request(fastify.server)
      .post("/signin")
      .send({ email: "noone@example.com", password: "any-pass" })
      .expect(401);

    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBe("Invalid credentials");
  });

  it("deve retornar 400 quando campos obrigatórios estiverem faltando", async () => {
    const res = await request(fastify.server)
      .post("/signin")
      .send({})
      .expect(400);
    expect(res.body).toHaveProperty("message");
  });
});

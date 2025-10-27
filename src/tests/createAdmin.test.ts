import { faker } from "@faker-js/faker";
import request from "supertest";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { UserRole } from "../infra/models/User";
import { fastify } from "../main/app";
import { makeAdmin } from "./factories/makeAdmin";
import { buildUserData } from "./factories/makeUser";

describe("POST /create-admin", () => {
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

  it("deve criar um novo admin com sucesso", async () => {
    const adminData = {
      ...buildUserData(),
      roles: [UserRole.ADMIN, UserRole.STUDENT],
    };

    const response = await request(fastify.server)
      .post("/create-admin")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(adminData)
      .expect(201);

    expect(response.body).toHaveProperty("id");
  });

  it("deve retornar erro 409 quando tentar criar admin com email existente", async () => {
    const adminData = {
      ...buildUserData(),
      roles: [UserRole.ADMIN, UserRole.STUDENT],
    };

    await request(fastify.server)
      .post("/create-admin")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(adminData)
      .expect(201);

    const response = await request(fastify.server)
      .post("/create-admin")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(adminData)
      .expect(409);

    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Existing admin account with this email");
  });

  it("deve retornar erro 400 quando roles não incluir ADMIN", async () => {
    const adminData = {
      ...buildUserData(),
      roles: [UserRole.STUDENT, UserRole.TEACHER],
    };

    const response = await request(fastify.server)
      .post("/create-admin")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(adminData)
      .expect(400);

    expect(response.body).toHaveProperty("error");
  });

  it("deve retornar erro 401 quando não houver autenticação", async () => {
    const adminData = {
      ...buildUserData(),
      roles: [UserRole.ADMIN, UserRole.STUDENT],
    };

    await request(fastify.server)
      .post("/create-admin")
      .send(adminData)
      .expect(401);
  });

  it("deve retornar erro 400 quando campos obrigatórios estiverem faltando", async () => {
    const incompleteData = {
      name: faker.person.fullName(),
    };

    await request(fastify.server)
      .post("/create-admin")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(incompleteData)
      .expect(400);
  });

  it("deve retornar erro 400 quando email for inválido", async () => {
    const adminData = {
      ...buildUserData(),
      email: "email-invalido",
      roles: [UserRole.ADMIN, UserRole.STUDENT],
    };

    await request(fastify.server)
      .post("/create-admin")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(adminData)
      .expect(400);
  });

  it("deve retornar erro 400 quando senha for muito curta", async () => {
    const adminData = {
      ...buildUserData(),
      password: "123",
      roles: [UserRole.ADMIN, UserRole.STUDENT],
    };

    await request(fastify.server)
      .post("/create-admin")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(adminData)
      .expect(400);
  });

  it("deve retornar erro 400 quando roles for vazio", async () => {
    const adminData = {
      ...buildUserData(),
      roles: [],
    };

    await request(fastify.server)
      .post("/create-admin")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(adminData)
      .expect(400);
  });
});

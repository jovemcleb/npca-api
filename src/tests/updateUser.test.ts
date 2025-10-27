import { faker } from "@faker-js/faker";
import request from "supertest";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { UserRole } from "../infra/models/User";
import { fastify } from "../main/app";
import { makeAdmin } from "./factories/makeAdmin";
import { makeUser } from "./factories/makeUser";

describe("PATCH /update-user/:userId", () => {
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

  it("deve atualizar o nome de um usuário com sucesso", async () => {
    const { res: userRes } = await makeUser();
    const userId = userRes.body.user.id;

    const newName = faker.person.fullName();

    const response = await request(fastify.server)
      .patch(`/update-user/${userId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ name: newName })
      .expect(200);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("User updated successfully");
    expect(response.body.user.name).toBe(newName);
  });

  it("deve atualizar múltiplos campos de um usuário", async () => {
    const { res: userRes } = await makeUser();
    const userId = userRes.body.user.id;

    const updateData = {
      name: faker.person.fullName(),
      institution: faker.company.name(),
      course: faker.person.jobTitle(),
      description: faker.lorem.paragraph(),
    };

    const response = await request(fastify.server)
      .patch(`/update-user/${userId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send(updateData)
      .expect(200);

    expect(response.body.user.name).toBe(updateData.name);
    expect(response.body.user.institution).toBe(updateData.institution);
    expect(response.body.user.course).toBe(updateData.course);
  });

  it("deve atualizar a senha e fazer hash corretamente", async () => {
    const { res: userRes, userData } = await makeUser();
    const userId = userRes.body.user.id;

    const newPassword = faker.internet.password({ length: 8 });

    await request(fastify.server)
      .patch(`/update-user/${userId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ password: newPassword })
      .expect(200);

    await request(fastify.server)
      .post("/signin")
      .send({
        email: userData.email,
        password: userData.password,
      })
      .expect(401);

    const loginResponse = await request(fastify.server)
      .post("/signin")
      .send({
        email: userData.email,
        password: newPassword,
      })
      .expect(200);

    expect(loginResponse.body).toHaveProperty("token");
  });

  it("deve atualizar as roles de um usuário", async () => {
    const { res: userRes } = await makeUser();
    const userId = userRes.body.user.id;

    const response = await request(fastify.server)
      .patch(`/update-user/${userId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ roles: [UserRole.STUDENT, UserRole.TEACHER] })
      .expect(200);

    expect(response.body.user.roles).toContain(UserRole.STUDENT);
    expect(response.body.user.roles).toContain(UserRole.TEACHER);
  });

  it("deve retornar erro 404 quando o usuário não existir", async () => {
    const fakeUserId = "507f1f77bcf86cd799439011";

    const response = await request(fastify.server)
      .patch(`/update-user/${fakeUserId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ name: "Novo Nome" })
      .expect(404);

    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("User not found");
  });

  it("deve retornar erro 401 quando não houver autenticação", async () => {
    const { res: userRes } = await makeUser();
    const userId = userRes.body.user.id;

    await request(fastify.server)
      .patch(`/update-user/${userId}`)
      .send({ name: "Novo Nome" })
      .expect(401);
  });

  it("deve retornar erro 400 quando o email for inválido", async () => {
    const { res: userRes } = await makeUser();
    const userId = userRes.body.user.id;

    const response = await request(fastify.server)
      .patch(`/update-user/${userId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ email: "email-invalido" })
      .expect(400);

    expect(response.body).toHaveProperty("error");
  });

  it("deve retornar erro 400 quando a senha for muito curta", async () => {
    const { res: userRes } = await makeUser();
    const userId = userRes.body.user.id;

    const response = await request(fastify.server)
      .patch(`/update-user/${userId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ password: "123" })
      .expect(400);

    expect(response.body).toHaveProperty("error");
  });
});

import { faker } from "@faker-js/faker";
import request from "supertest";
import { fastify } from "../../main/app";

export function buildUserData(overrides: Partial<Record<string, any>> = {}) {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 8 }),
    institution: faker.company.name(),
    course: faker.person.jobTitle(),
    ...overrides,
  };
}

export async function makeUser(overrides: Partial<Record<string, any>> = {}) {
  const userData = buildUserData(overrides);
  const res = await request(fastify.server).post("/signup").send(userData);
  return { res, userData };
}

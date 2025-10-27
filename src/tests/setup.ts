import mongoose from "mongoose";
import { afterAll, beforeAll, beforeEach } from "vitest";
import { fastify } from "../main/app";

beforeAll(async () => {
  await fastify.ready();

  if (mongoose.connection && mongoose.connection.db) {
    try {
      await mongoose.connection.db.dropDatabase();
    } catch (err) {
      console.warn("Não foi possível dropar o banco de teste:", err);
    }
  }
});

beforeEach(async () => {
  if (mongoose.connection && mongoose.connection.db) {
    const collections = await mongoose.connection.db.collections();
    for (const col of collections) {
      try {
        await col.deleteMany({});
      } catch (err) {
        console.warn(`Falha ao limpar coleção ${col.collectionName}:`, err);
      }
    }
  }
});

afterAll(async () => {
  try {
    await fastify.close();
  } catch (err) {
    console.warn("Erro ao fechar fastify no teardown:", err);
  }

  try {
    await mongoose.connection.close();
  } catch (err) {
    console.warn("Erro ao fechar mongoose no teardown:", err);
  }
});

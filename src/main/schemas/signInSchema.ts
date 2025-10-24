import z from "zod";

const signInBodySchema = z.object({
  email: z.email(),
  password: z.string().min(4),
});

export const signInSchema = {
  tags: ["Users"],
  summary: "/SignIn",
  description: "Autenticação de usuário",
  body: signInBodySchema,
  response: {
    200: z
      .object({
        token: z.string(),
      })
      .describe("Autenticação realizada com sucesso"),

    401: z
      .object({
        error: z.string(),
      })
      .describe("Credenciais inválidas"),
  },
};

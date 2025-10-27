import z from "zod";

const signInBodySchema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(4, "A senha deve ter no mínimo 4 caracteres"),
});

export type SignInInput = z.infer<typeof signInBodySchema>;

export const signInSchema = {
  tags: ["Users"],
  summary: "/signin",
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

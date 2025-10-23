import z from "zod";

const signUpBodySchema = z.object({
  name: z.string().min(2, "O nome deve ter no mínimo 2 caracteres"),
  email: z.email("Email inválido"),
  password: z.string().min(4, "A senha deve ter no mínimo 4 caracteres"),
  institution: z.string().min(1, "A instituição é obrigatória"),
  course: z.string().min(1, "O curso é obrigatório"),
});

export type SignUpBody = z.infer<typeof signUpBodySchema>;

export const signUpSchema = {
  tags: ["Users"],
  summary: "/SignUp",
  description: "Cria um novo usuário",
  body: signUpBodySchema,
  response: {
    201: z
      .object({
        user: z.object({
          id: z.string(),
        }),
      })
      .describe("Usuário criado com sucesso"),

    409: z
      .object({
        error: z.string(),
      })
      .describe("Conflito de dados, como email já em uso"),
  },
};

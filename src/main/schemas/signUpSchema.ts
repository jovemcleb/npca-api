import z from "zod";
import { userBaseSchema } from "./userBaseSchema";

const signUpBodySchema = userBaseSchema;

export type SignUpInput = z.infer<typeof signUpBodySchema>;

export const signUpSchema = {
  tags: ["Users"],
  summary: "/signup",
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

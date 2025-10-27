import z from "zod";
import { UserRole } from "../../infra/models/User";
import { userBaseSchema } from "./userBaseSchema";

const updateUserParamsSchema = z.object({
  userId: z.string().min(1, "O ID do usuário é obrigatório"),
});

const updateUserBodySchema = userBaseSchema.partial().extend({
  roles: z.array(z.nativeEnum(UserRole)).optional(),
});

export type UpdateUserParams = z.infer<typeof updateUserParamsSchema>;
export type UpdateUserBody = z.infer<typeof updateUserBodySchema>;

export const updateUserSchema = {
  tags: ["Admin"],
  summary: "/update-user/:userId",
  description: "Atualiza os dados de um usuário",
  params: updateUserParamsSchema,
  body: updateUserBodySchema,
  response: {
    200: z
      .object({
        message: z.string(),
        user: z.object({
          id: z.string(),
          name: z.string(),
          email: z.string(),
          institution: z.string(),
          course: z.string(),
          roles: z.array(z.string()),
        }),
      })
      .describe("Usuário atualizado com sucesso"),

    404: z
      .object({
        error: z.string(),
      })
      .describe("Usuário não encontrado"),

    400: z
      .object({
        error: z.string(),
      })
      .describe("Dados inválidos"),
  },
};

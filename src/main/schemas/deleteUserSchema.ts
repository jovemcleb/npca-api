import z from "zod";

const deleteUserParamsSchema = z.object({
  userId: z.string().min(1, "O ID do usuário é obrigatório"),
});

export type DeleteUserInput = z.infer<typeof deleteUserParamsSchema>;

export const deleteUserSchema = {
  tags: ["Admin"],
  summary: "/delete-user/:userId",
  description: "Deleta um usuário do sistema",
  params: deleteUserParamsSchema,
  response: {
    200: z
      .object({
        message: z.string(),
        user: z.object({
          id: z.string(),
          name: z.string(),
          email: z.string(),
        }),
      })
      .describe("Usuário deletado com sucesso"),

    404: z
      .object({
        error: z.string(),
      })
      .describe("Usuário não encontrado"),
  },
};

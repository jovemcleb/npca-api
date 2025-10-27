import z from "zod";

const grantAdminRoleBodySchema = z.object({
  userId: z.string().min(1, "O ID do usuário é obrigatório"),
});

export type GrantAdminRoleInput = z.infer<typeof grantAdminRoleBodySchema>;

export const grantAdminRoleSchema = {
  tags: ["Admin"],
  summary: "/grant-admin-role",
  description: "Concede a role de admin a um usuário",
  body: grantAdminRoleBodySchema,
  response: {
    200: z
      .object({
        message: z.string(),
        user: z.object({
          id: z.string(),
          name: z.string(),
          email: z.string(),
          roles: z.array(z.string()),
        }),
      })
      .describe("Role de admin concedida com sucesso"),

    404: z
      .object({
        error: z.string(),
      })
      .describe("Usuário não encontrado"),

    400: z
      .object({
        error: z.string(),
      })
      .describe("Usuário já possui a role de admin"),
  },
};

import z from "zod";
import { UserRole } from "../../infra/models/User";

export const createAdminBodySchema = z.object({
  name: z.string().min(2, "O nome deve ter no mínimo 2 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(4, "A senha deve ter no mínimo 4 caracteres"),
  institution: z.string().min(1, "A instituição é obrigatória"),
  course: z.string().min(1, "O curso é obrigatório"),
  roles: z
    .array(z.enum(UserRole))
    .min(1, "Pelo menos uma role é obrigatória")
    .refine(
      (roles) => roles.includes(UserRole.ADMIN),
      "A role ADMIN é obrigatória"
    )
    .describe("Roles do administrador"),
});

export type CreateAdminInput = z.infer<typeof createAdminBodySchema>;

export const createAdminSchema = {
  tags: ["Admin"],
  summary: "/create-admin",
  description: "Cria um novo administrador",
  body: createAdminBodySchema,
  response: {
    201: z
      .object({
        id: z.string(),
      })
      .describe("Administrador criado com sucesso"),

    400: z
      .object({
        error: z.string(),
      })
      .describe("Role fornecida inválida"),

    409: z
      .object({
        error: z.string(),
      })
      .describe("Conflito de dados, como email já em uso"),
  },
};

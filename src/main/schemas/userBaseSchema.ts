import z from "zod";

export const userBaseSchema = z.object({
  name: z.string().min(2, "O nome deve ter no mínimo 2 caracteres"),
  email: z.email("Email inválido"),
  password: z.string().min(4, "A senha deve ter no mínimo 4 caracteres"),
  description: z.string().optional(),
  institution: z.string().min(1, "A instituição é obrigatória"),
  course: z.string().min(1, "O curso é obrigatório"),
  articles: z
    .array(
      z.object({
        title: z.string(),
        url: z.url("URL inválida"),
        description: z.string().optional(),
      })
    )
    .optional(),
  projects: z
    .array(
      z.object({
        title: z.string(),
        description: z.string().optional(),
      })
    )
    .optional(),
});

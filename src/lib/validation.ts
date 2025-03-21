import { z } from "zod";

export const emailSchema = z
  .string()
  .min(1, { message: "E-Mail ist erforderlich" })
  .email({ message: "Ungültiges E-Mail-Format" });

export const passwordSchema = z
  .string()
  .min(1, { message: "Passwort ist erforderlich" })
  .min(6, { message: "Passwort muss mindestens 6 Zeichen lang sein" });

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z
      .string()
      .min(1, { message: "Passwort-Bestätigung ist erforderlich" }),
    firstName: z.string().min(1, { message: "Vorname ist erforderlich" }),
    lastName: z.string().min(1, { message: "Nachname ist erforderlich" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwörter stimmen nicht überein",
    path: ["confirmPassword"],
  });

export type SignupFormData = z.infer<typeof signupSchema>;

export const recipeSchema = z.object({
  name: z.string().min(1, { message: "Rezeptname ist erforderlich" }),
  description: z.string().min(1, { message: "Beschreibung ist erforderlich" }),
  instructions: z.string().min(1, { message: "Anleitung ist erforderlich" }),
  servings: z.string().min(1, { message: "Portionen auswählen" }),
  category_id: z.string().min(1, { message: "Kategorie auswählen" }),
  rating: z.string().optional(),
});

export type RecipeFormData = z.infer<typeof recipeSchema>;

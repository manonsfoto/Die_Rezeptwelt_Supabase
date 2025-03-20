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
    firstName: z
      .string()
      .min(1, { message: "Vorname ist erforderlich" }),
    lastName: z
      .string()
      .min(1, { message: "Nachname ist erforderlich" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwörter stimmen nicht überein",
    path: ["confirmPassword"],
  });


export type SignupFormData = z.infer<typeof signupSchema>;

import { z } from "zod";

// TODO: add more rules before prod
const passwordSchema = z.string({ required_error: "Password is required" });

const baseAuthFields = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email"),
  password: passwordSchema,
});

export const RegistrationFormSchema = baseAuthFields
  .and(z.object({ confirm: passwordSchema }))
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

export const VerificationFormSchema = z.object({
  code: z
    .string({ required_error: "Code is required" })
    .length(6, "Code should have 6 digits"),
});

export type RegistrationFormValues = z.infer<typeof RegistrationFormSchema>;

export const LoginFormSchema = baseAuthFields;

export type LoginFormValues = z.infer<typeof LoginFormSchema>;
export type VerificationFormValues = z.infer<typeof VerificationFormSchema>;

import { z } from "zod";

// TODO: add more rules before prod
const passwordSchema = z.string({ required_error: "Password is required" });
const verificationCodeSchema = z
  .string({ required_error: "Code is required" })
  .length(6, "Code should have 6 digits");
const emailSchema = z
  .string({ required_error: "Email is required" })
  .email("Invalid email");

const baseAuthFields = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const RegistrationFormSchema = baseAuthFields
  .and(z.object({ confirm: passwordSchema }))
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

export const VerificationFormSchema = z.object({
  code: verificationCodeSchema,
});

export const PasswordResetFormSchema = z.object({
  password: passwordSchema,
  code: verificationCodeSchema,
});

export const PasswordResetRequestFormSchema = z.object({
  email: emailSchema,
});

export const LoginFormSchema = baseAuthFields;

export type RegistrationFormValues = z.infer<typeof RegistrationFormSchema>;
export type LoginFormValues = z.infer<typeof LoginFormSchema>;
export type VerificationFormValues = z.infer<typeof VerificationFormSchema>;
export type PasswordResetFormValues = z.infer<typeof PasswordResetFormSchema>;
export type PasswordResetRequestFormValues = z.infer<
  typeof PasswordResetRequestFormSchema
>;

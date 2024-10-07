import { ZodSchema } from "zod";

export type ZodFormattedError = { path: string; message: string };

export const zodValidateAndFormatErrors = <T>(
  schema: ZodSchema<T>,
  data: unknown
):
  | { success: true; data: T }
  | { success: false; errors: ZodFormattedError[] } => {
  const result = schema.safeParse(data);

  if (!result.success) {
    const formattedErrors = result.error.errors.map((error) => ({
      path: error.path.join("."),
      message: error.message,
    }));
    return { success: false, errors: formattedErrors };
  }

  return { success: true, data: result.data };
};

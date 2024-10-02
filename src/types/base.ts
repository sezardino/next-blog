import { ZodFormattedError } from "@/utils/zod";

export type BaseGetRequest = {
  page?: number;
  limit?: number;
};

export type ServerActionResponse<T = void> =
  | T
  | { message: string; errors?: ZodFormattedError[] };

export type SuccessResponse = { success: true };

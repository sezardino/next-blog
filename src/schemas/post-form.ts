import { getHTMLStringLength } from "@/utils/html-length";
import { z } from "zod";

const DESCRIPTION_MIN_LENGTH = 8;
const BODY_MIN_LENGTH = 300;
const BODY_MAX_LENGTH = 10_000;
const TAGS_MIN_LENGTH = 1;
const TAGS_MAX_LENGTH = 10;

export const PostFormSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(8, "Title is too short")
    .max(64, "Title is too long"),
  description: z
    .string()
    .max(100, "Description should be maximum 100 characters")
    .refine(
      (value) =>
        value.length === 0 ? true : value.length > DESCRIPTION_MIN_LENGTH,
      `Description should be minimum ${DESCRIPTION_MIN_LENGTH} characters`
    ),
  // thumbnail: z.any(),
  publishedAt: z
    .date()
    .optional()
    .refine((date) => !date || date > new Date(), {
      message: "Publication date must be in the future",
    }),
  tags: z
    .array(z.string())
    .refine(
      (value) => (value.length === 0 ? true : value.length >= TAGS_MIN_LENGTH),
      `Minimum tags length ${TAGS_MIN_LENGTH}`
    )
    .refine(
      (value) => (value.length === 0 ? true : value.length < TAGS_MAX_LENGTH),
      `Maximum tags length ${TAGS_MAX_LENGTH}`
    ),
  body: z
    .string()
    .refine(
      (value) =>
        value.length === 0
          ? true
          : getHTMLStringLength(value) > BODY_MIN_LENGTH,
      `Body minimum characters length should be ${BODY_MIN_LENGTH}`
    )
    .refine(
      (value) =>
        value.length === 0
          ? true
          : getHTMLStringLength(value) < BODY_MAX_LENGTH,
      `Body maximum characters length should be ${BODY_MAX_LENGTH}`
    ),
});

export type PostFormValues = z.infer<typeof PostFormSchema>;

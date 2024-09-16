import { getHTMLStringLength } from "@/utils/html-length";
import { z } from "zod";

const DESCRIPTION_MIN_LENGTH = 8;
const BODY_MIN_LENGTH = 300;
const BODY_MAX_LENGTH = 10_000;
const TAGS_MIN_LENGTH = 1;
const TAGS_MAX_LENGTH = 10;

const descriptionSchema = z
  .string()
  .max(100, "Description should be maximum 100 characters");

const descriptionOptionalSchema = descriptionSchema.refine(
  (value) =>
    value.length === 0 ? true : value.length > DESCRIPTION_MIN_LENGTH,
  `Description should be minimum ${DESCRIPTION_MIN_LENGTH} characters`
);

const descriptionRequiredSchema = descriptionSchema.min(
  DESCRIPTION_MIN_LENGTH,
  `Description should be minimum ${DESCRIPTION_MIN_LENGTH} characters`
);

const tagsSchema = z.array(z.string());

const tagsOptionalSchema = tagsSchema
  .refine(
    (value) => (value.length === 0 ? true : value.length >= TAGS_MIN_LENGTH),
    `Minimum tags length ${TAGS_MIN_LENGTH}`
  )
  .refine(
    (value) => (value.length === 0 ? true : value.length < TAGS_MAX_LENGTH),
    `Maximum tags length ${TAGS_MAX_LENGTH}`
  );

const tagsRequiredSchema = tagsSchema
  .min(TAGS_MIN_LENGTH, `Minimum tags length ${TAGS_MIN_LENGTH}`)
  .max(TAGS_MAX_LENGTH, `Maximum tags length ${TAGS_MAX_LENGTH}`);

const bodySchema = z.string();

const bodyOptionalSchema = bodySchema
  .refine(
    (value) =>
      value.length === 0 ? true : getHTMLStringLength(value) > BODY_MIN_LENGTH,
    `Body minimum characters length should be ${BODY_MIN_LENGTH}`
  )
  .refine(
    (value) =>
      value.length === 0 ? true : getHTMLStringLength(value) < BODY_MAX_LENGTH,
    `Body maximum characters length should be ${BODY_MAX_LENGTH}`
  );

const bodyRequiredSchema = bodySchema
  .refine(
    (value) => getHTMLStringLength(value) > BODY_MIN_LENGTH,
    `Body minimum characters length should be ${BODY_MIN_LENGTH}`
  )
  .refine(
    (value) => getHTMLStringLength(value) < BODY_MAX_LENGTH,
    `Body maximum characters length should be ${BODY_MAX_LENGTH}`
  );

export const PostSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(8, "Title is too short")
    .max(64, "Title is too long"),
  description: descriptionOptionalSchema.optional(),
  // thumbnail: z.any(),
  publishedAt: z
    .date()
    .optional()
    .refine((date) => !date || date > new Date(), {
      message: "Publication date must be in the future",
    }),
  tags: tagsOptionalSchema,
  body: bodyOptionalSchema,
});

export const PostFormSchema = PostSchema.superRefine((data, ctx) => {
  const { publishedAt, body, tags, description } = data;

  if (!publishedAt) return;

  const descriptionValidation =
    descriptionRequiredSchema.safeParse(description);
  const tagsValidation = tagsRequiredSchema.safeParse(tags);
  const bodyValidation = bodyRequiredSchema.safeParse(body);

  if (!descriptionValidation.success) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["description"],
      message:
        descriptionValidation.error.errors[0]?.message || "Invalid description",
    });
  }

  if (!tagsValidation.success) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["tags"],
      message: tagsValidation.error.errors[0]?.message || "Invalid tags",
    });
  }

  if (!bodyValidation.success) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["body"],
      message: bodyValidation.error.errors[0]?.message || "Invalid body",
    });
  }
});

export const EditPostSchema = PostSchema.partial();

export type PostFormValues = z.infer<typeof PostFormSchema>;

import { getHTMLStringLength } from "@/utils/html-length";
import { z } from "zod";

const DESCRIPTION_MIN_LENGTH = 8;
const BODY_MIN_LENGTH = 300;
const BODY_MAX_LENGTH = 10_000;
const TAGS_MIN_LENGTH = 1;
const TAGS_MAX_LENGTH = 10;

const mbToBites = (mb: number) => mb * 1024 * 1024;

const MAX_THUMBNAIL_SIZE_MB = 10;
const MAX_FILE_SIZE = mbToBites(MAX_THUMBNAIL_SIZE_MB);
export const ACCEPTED_IMAGE_TYPES_POST_THUMBNAIL = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const getThumbnailSchema = (isOptional = false) => {
  const schema = z
    .instanceof(File, { message: "Invalid input for thumbnail" })
    .refine(
      (file) =>
        isOptional && typeof file === "undefined"
          ? true
          : ACCEPTED_IMAGE_TYPES_POST_THUMBNAIL.includes(file.type),
      "Only .jpg, .png, or .webp files are accepted."
    )
    .refine(
      (file) =>
        isOptional && typeof file === "undefined"
          ? true
          : file.size <= MAX_FILE_SIZE,
      `File size must be less than ${MAX_THUMBNAIL_SIZE_MB}MB.`
    );

  return isOptional ? schema.optional() : schema;
};

export const getBodySchema = (isOptional: boolean = false) => {
  const schema = z
    .string()
    .refine(
      (value) =>
        isOptional && getHTMLStringLength(value) === 0
          ? true
          : getHTMLStringLength(value) > BODY_MIN_LENGTH,
      `Body minimum characters length should be ${BODY_MIN_LENGTH}`
    )
    .refine(
      (value) =>
        isOptional && getHTMLStringLength(value) === 0
          ? true
          : getHTMLStringLength(value) < BODY_MAX_LENGTH,
      `Body maximum characters length should be ${BODY_MAX_LENGTH}`
    );

  return isOptional ? schema.optional() : schema;
};

export const getDescriptionSchema = (isOptional = false) => {
  const schema = z
    .string()
    .max(100, "Description should be maximum 100 characters")
    .refine(
      (value) =>
        isOptional && value.length === 0
          ? true
          : value.length > DESCRIPTION_MIN_LENGTH,
      `Description should be minimum ${DESCRIPTION_MIN_LENGTH} characters`
    );

  return isOptional ? schema.optional() : schema;
};

export const getTagsSchema = (isOptional: boolean = false) => {
  const schema = z
    .array(z.string())
    .refine(
      (value) =>
        isOptional && value.length === 0
          ? true
          : value.length >= TAGS_MIN_LENGTH,
      `Minimum tags length should be ${TAGS_MIN_LENGTH}`
    )
    .refine(
      (value) =>
        isOptional && value.length === 0
          ? true
          : value.length < TAGS_MAX_LENGTH,
      `Maximum tags length should be ${TAGS_MAX_LENGTH}`
    );

  return isOptional ? schema.optional() : schema;
};

const titleSchema = z
  .string({ required_error: "Title is required" })
  .min(8, "Title is too short")
  .max(64, "Title is too long");

export const PostFormSchema = z.object({
  title: titleSchema,
  description: getDescriptionSchema(true),
  thumbnail: getThumbnailSchema(true),
  tags: getTagsSchema(true),
  body: getBodySchema(true),
});

export const PostReadyForScheduleSchema = z.object({
  title: titleSchema,
  description: getDescriptionSchema(),
  thumbnail: getThumbnailSchema(),
  tags: getTagsSchema(),
  body: getBodySchema(),
});

export const CreatePostSchema = PostFormSchema.merge(
  z.object({
    publicationDate: z.date().optional(),
  })
);

export type CreatePostValues = z.infer<typeof CreatePostSchema>;
export const EditPostSchema = PostFormSchema.partial();

export type PostFormValues = z.infer<typeof PostFormSchema>;

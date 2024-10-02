import { z } from "zod";

const mbToBites = (mb: number) => mb * 1024 * 1024;

const MAX_AVATAR_SIZE_MB = 5;
const MAX_FILE_SIZE = mbToBites(MAX_AVATAR_SIZE_MB);
export const ACCEPTED_IMAGE_TYPES_FOR_AVATAR = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export const UserAvatarSchema = z.object({
  avatar: z
    .instanceof(File, { message: "Invalid input" })

    .refine(
      (file) => ACCEPTED_IMAGE_TYPES_FOR_AVATAR.includes(file.type),
      "Only .jpg, .png, or .webp files are accepted."
    )
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      `File size must be less than ${MAX_AVATAR_SIZE_MB}MB.`
    ),
});

export type UserAvatarFormValues = z.infer<typeof UserAvatarSchema>;

"use server";

import { ProjectUrls } from "@/const";
import prismaClient from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import z from "zod";

export const uploadAvatarImage = async () => {};

const UpdateProfileSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  bio: z.string().optional(),
});

export const updateProfileData = async (
  data: z.infer<typeof UpdateProfileSchema>
) => {
  const { userId } = auth();

  if (!userId)
    return {
      errors: [],
      message: "Unauthorized",
    };

  const validatedFields = UpdateProfileSchema.safeParse(data);

  if (!validatedFields.success)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update profile.",
    };

  const { firstName, lastName, bio } = validatedFields.data;

  try {
    await prismaClient.user.update({
      where: { clerkId: userId },
      data: { firstName, lastName, bio },
    });
  } catch (error) {
    return { message: "Database Error: Failed to Update Profile." };
  }

  revalidatePath(ProjectUrls.settings);
};

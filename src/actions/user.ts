"use server";

import { ProjectUrls } from "@/const";
import { prisma } from "@/lib/prisma";

import { auth } from "@clerk/nextjs/server";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import z from "zod";

export type FormState = {
  errors?: { field: string; error: string }[];
  message?: string | null;
};

type CurrentUserData = Pick<User, "avatarUrl" | "email">;

export const getCurrentUserData = async (): Promise<CurrentUserData | null> => {
  const { userId } = auth();

  if (!userId) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { email: true, avatarUrl: true },
    });

    return user;
  } catch (error) {
    console.log("error", error);
    throw new Error("Error when try to fetch user");
  }
};

export const getCurrentUserProfile = async (): Promise<Pick<
  User,
  "avatarUrl" | "firstName" | "lastName" | "bio"
> | null> => {
  const { userId } = auth();

  if (!userId) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { bio: true, firstName: true, lastName: true, avatarUrl: true },
    });

    return user;
  } catch (error) {
    console.log("error", error);
    throw new Error(JSON.stringify(error));
  }
};

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
    await prisma.user.update({
      where: { clerkId: userId },
      data: { firstName, lastName, bio },
    });
  } catch (error) {
    return { message: "Database Error: Failed to Update Profile." };
  }

  revalidatePath(ProjectUrls.settings);
};

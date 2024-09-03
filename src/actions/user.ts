"use server";

import { prisma } from "@/lib/prisma";

import { auth } from "@clerk/nextjs/server";
import { User } from "@prisma/client";

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
    console.log("error");
    throw new Error("Error when try to fetch user");
  }
};

export const uploadAvatarImage = async () => {};

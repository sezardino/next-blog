"use server";

import prismaClient from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const getCurrentUserData = async () => {
  const { userId } = auth();

  if (!userId) return null;

  try {
    const user = await prismaClient.user.findUnique({
      where: { clerkId: userId },
      select: { email: true, avatar: true, firstName: true, lastName: true },
    });

    if (!user) return { message: "User not found" };

    const { avatar, ...rest } = user;

    return {
      ...rest,
      avatarUrl: avatar?.publicPath || null,
    };
  } catch (error) {
    console.log("error", error);
    throw new Error("Error when try to fetch user");
  }
};

"use server";

import prismaClient from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const getMyPost = async (id: string) => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  try {
    const post = await prismaClient.post.findUnique({
      where: { id, author: { clerkId: userId }, deletedAt: null },
      select: {
        title: true,
        tags: true,
        thumbnailUrl: true,
        body: true,
      },
    });

    return post;
  } catch (error) {
    console.log(error);
    return { message: "Something went wrong" };
  }
};

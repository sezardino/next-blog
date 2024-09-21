"use server";
import prismaClient from "@/lib/prisma";

import { auth } from "@clerk/nextjs/server";

export const isPostExistOnCurrentUser = async (postId: string) => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  try {
    const neededPost = await prismaClient?.post.findUnique({
      where: { id: postId, author: { clerkId: userId } },
      select: { isPublished: true, publicationDate: true },
    });

    if (!neededPost) return { message: "Post not found" };

    return { exist: true };
  } catch (error) {
    console.log(error);
    return { message: "Error when try to delete post" };
  }
};

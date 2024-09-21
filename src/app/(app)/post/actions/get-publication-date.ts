"use server";

import prismaClient from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const getPostScheduledDate = async (postId: string) => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  try {
    const post = await prismaClient.post.findUnique({
      where: { id: postId, author: { clerkId: userId } },
      select: { publicationDate: true },
    });

    if (!post) return { message: "Post not found" };

    return post;
  } catch (error) {
    console.log(error);
    return {
      message: "There was an error when trying to fetch post scheduled date",
    };
  }
};

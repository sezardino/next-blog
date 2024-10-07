"use server";

import prismaClient from "@/lib/prisma";
import { checkIfPostWasPublished } from "@/utils/post";

import { auth } from "@clerk/nextjs/server";

export const checkMyPostPublicationStatus = async (postId: string) => {
  const { userId } = auth();
  console.log({ postId });
  if (!userId) throw new Error("Unauthorized");

  try {
    const neededPost = await prismaClient?.post.findUnique({
      where: { id: postId, author: { clerkId: userId }, deletedAt: null },
      select: {
        isPublished: true,
        publicationDate: true,
      },
    });

    if (!neededPost) return { message: "Post not found" };

    const { isPublished, publicationDate } = neededPost;

    const wasPublished = checkIfPostWasPublished(isPublished, publicationDate);

    if (!wasPublished) return { message: "This post was't be published" };

    return { isPublished };
  } catch (error) {
    console.log(error);
    return { message: "Error when try to delete post" };
  }
};

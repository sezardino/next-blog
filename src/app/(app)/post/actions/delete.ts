"use server";
import prismaClient from "@/lib/prisma";

import { checkIfPostCanBeModified } from "@/utils/post-dates";
import { auth } from "@clerk/nextjs/server";

export const deleteMyPostById = async (postId: string) => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  try {
    const neededPost = await prismaClient?.post.findUnique({
      where: { id: postId, author: { clerkId: userId } },
      select: { isPublished: true, publicationDate: true },
    });

    if (!neededPost) return { message: "Post not found" };
    const isPostCanBePublished = checkIfPostCanBeModified(
      neededPost.isPublished,
      neededPost.publicationDate
    );

    if (!isPostCanBePublished) {
      await prismaClient.post.delete({
        where: { id: postId, author: { clerkId: userId } },
      });
      return;
    }

    await prismaClient.post.update({
      where: { id: postId, author: { clerkId: userId } },
      data: { deletedAt: new Date() },
      select: { id: true },
    });
  } catch (error) {
    console.log(error);
    return { message: "Error when try to delete post" };
  }
};

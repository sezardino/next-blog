"use server";
import prismaClient from "@/lib/prisma";

import { checkIfPostCanBeModified } from "@/utils/post";
import { auth } from "@clerk/nextjs/server";

export const deleteMyPostById = async (postId: string) => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  try {
    const neededPost = await prismaClient?.post.findUnique({
      where: { id: postId, author: { clerkId: userId } },
      select: {
        isPublished: true,
        publicationDate: true,
        tags: { select: { id: true, _count: { select: { posts: true } } } },
      },
    });

    if (!neededPost) return { message: "Post not found" };
    const isPostCanBePublished = checkIfPostCanBeModified(
      neededPost.isPublished,
      neededPost.publicationDate
    );

    if (!isPostCanBePublished) {
      const tagsToDelete = neededPost.tags
        .filter((t) => t._count.posts <= 1)
        .map((t) => t.id);

      await prismaClient.$transaction([
        prismaClient.post.delete({
          where: { id: postId, author: { clerkId: userId } },
        }),
        prismaClient.tag.deleteMany({
          where: { id: { in: tagsToDelete } },
        }),
      ]);

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

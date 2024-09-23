"use server";

import prismaClient from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const getPostsStatistic = async () => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  try {
    const [
      postsCount,
      publishedCount,
      unpublishedCount,
      scheduledCount,
      draftCount,
    ] = await prismaClient.$transaction([
      prismaClient.post.count({
        where: { author: { clerkId: userId }, deletedAt: null },
      }),
      prismaClient.post.count({
        where: {
          author: { clerkId: userId },
          isPublished: true,
          deletedAt: null,
        },
      }),
      prismaClient.post.count({
        where: {
          author: { clerkId: userId },
          isPublished: false,
          deletedAt: null,
        },
      }),
      prismaClient.post.count({
        where: {
          author: { clerkId: userId },
          isPublished: false,
          publicationDate: { not: null },
          deletedAt: null,
        },
      }),
      prismaClient.post.count({
        where: {
          author: { clerkId: userId },
          isPublished: false,
          publicationDate: null,
          deletedAt: null,
        },
      }),
    ]);

    return {
      total: postsCount,
      published: publishedCount,
      unpublished: unpublishedCount,
      scheduled: scheduledCount,
      draft: draftCount,
    };
  } catch (error) {
    console.log(error);
    return { message: "Something went wrong" };
  }
};

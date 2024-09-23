"use server";

import prismaClient from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const getMyPostsReactionsStatistics = async () => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  try {
    const reactions = await prismaClient.reaction.findMany({
      where: {
        post: { author: { clerkId: userId }, deletedAt: null },
      },
      select: { isLike: true },
    });

    const total = reactions.length;
    const likes = reactions.filter((r) => r.isLike).length;

    return {
      total,
      likes,
      dislikes: total - likes,
    };
  } catch (error) {
    console.error("Error fetching post reactions:", error);
    return { message: "Something went wrong while fetching post reactions" };
  }
};

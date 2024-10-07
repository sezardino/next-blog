"use server";

import prismaClient from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const getViewsStatistics = async () => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  try {
    const views = await prismaClient.view.findMany({
      where: { post: { author: { clerkId: userId }, deletedAt: null } },
      select: { userId: true },
    });

    const total = views.length;
    const authorized = views.filter((r) => !!r.userId).length;

    return {
      total: views.length,
      authorized,
      anonymous: total - authorized,
    };
  } catch (error) {
    console.error("Error fetching posts views:", error);
    return { message: "Something went wrong while fetching posts views" };
  }
};

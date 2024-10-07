"use server";

import prismaClient from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const getMyUpcomingPosts = async () => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  try {
    const data = await prismaClient.post.findMany({
      where: {
        author: { clerkId: userId },
        isPublished: false,
        publicationDate: { gte: new Date() },
        deletedAt: null,
      },
      select: {
        id: true,
        title: true,
        publicationDate: true,
        modifiedAt: true,
      },
      orderBy: [{ publicationDate: "asc" }, { createdAt: "asc" }],
      take: 5,
    });

    return { data };
  } catch (error) {
    console.error("Error fetching upcoming posts:", error);
    return { message: "Something went wrong while fetching upcoming posts" };
  }
};

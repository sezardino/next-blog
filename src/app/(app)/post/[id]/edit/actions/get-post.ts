"use server";

import prismaClient from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const getMyPostForEdition = async (id: string) => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  try {
    const post = await prismaClient.post.findUnique({
      where: { id, author: { clerkId: userId } },
      select: {
        title: true,
        tags: { select: { name: true } },
        description: true,
        publicationDate: true,
        isPublished: true,
        thumbnailUrl: true,
        body: true,
      },
    });

    if (!post) return { message: "Post not found" };

    return { ...post, tags: post.tags.map((t) => t.name) };
  } catch (error) {
    console.log(error);
    return { message: "Something went wrong" };
  }
};

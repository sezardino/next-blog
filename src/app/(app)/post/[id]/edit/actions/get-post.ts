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
        thumbnail: { select: { publicPath: true } },
        body: true,
      },
    });

    if (!post) return { message: "Post not found" };

    const { tags, thumbnail, ...restPost } = post;

    return {
      ...restPost,
      thumbnailUrl: thumbnail?.publicPath || null,
      tags: tags.map((t) => t.name),
    };
  } catch (error) {
    console.log(error);
    return { message: "Something went wrong" };
  }
};

"use server";

import prismaClient from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const getPost = async (id: string) => {
  const { userId } = auth();

  try {
    const post = await prismaClient.post.findUnique({
      where: { id, isPublished: true, deletedAt: null },
      select: {
        title: true,
        tags: true,
        thumbnail: { select: { publicPath: true } },
        body: true,
        publicationDate: true,
        author: { select: { clerkId: true } },
      },
    });

    if (!post) return { message: "Post not found" };

    const { tags, thumbnail, ...restPost } = post;

    // create new view
    if (post.author.clerkId !== userId) {
      await prismaClient.view.create({
        data: {
          post: { connect: { id } },
          user: userId ? { connect: { clerkId: userId } } : undefined,
        },
      });
    }

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

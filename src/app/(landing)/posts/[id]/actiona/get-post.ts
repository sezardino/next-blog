"use server";

import prismaClient from "@/lib/prisma";

export const getPost = async (id: string) => {
  try {
    const post = await prismaClient.post.findUnique({
      where: { id, isPublished: true, deletedAt: null },
      select: {
        title: true,
        tags: true,
        thumbnailUrl: true,
        body: true,
        publicationDate: true,
      },
    });

    if (!post) return { message: "Post not found" };

    return post;
  } catch (error) {
    console.log(error);
    return { message: "Something went wrong" };
  }
};

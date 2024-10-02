"use server";

import prismaClient from "@/lib/prisma";

export const getPost = async (id: string) => {
  try {
    const post = await prismaClient.post.findUnique({
      where: { id, isPublished: true, deletedAt: null },
      select: {
        title: true,
        tags: true,
        thumbnail: { select: { publicPath: true } },
        body: true,
        publicationDate: true,
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

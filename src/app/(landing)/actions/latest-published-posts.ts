"use server";

import prismaClient from "@/lib/prisma";

export const getLatestPublishedPosts = async () => {
  try {
    const posts = await prismaClient.post.findMany({
      where: { isPublished: true, deletedAt: null },
      select: {
        id: true,
        title: true,
        description: true,
        thumbnailUrl: true,
        publicationDate: true,
        tags: true,
        author: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            avatarUrl: true,
          },
        },
        reactions: { select: { isLike: true } },
        _count: {
          select: {
            views: true,
            comments: true,
          },
        },
      },
      orderBy: {
        publicationDate: "desc",
      },
      take: 10,
    });

    const formattedPosts = posts.map(({ _count, reactions, ...rest }) => ({
      ...rest,
      views: _count.views,
      comments: _count.comments,
      likes: reactions.filter((r) => r.isLike).length,
      dislikes: reactions.filter((r) => !r.isLike).length,
    }));

    return { data: formattedPosts };
  } catch (error) {
    console.error("Error fetching latest published posts:", error);
    return { message: "Something went wrong while fetching posts" };
  }
};

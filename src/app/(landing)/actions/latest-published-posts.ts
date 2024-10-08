"use server";

import { BASE_POSTS_SELECT } from "@/const/post";
import prismaClient from "@/lib/prisma";

export const getLatestPublishedPosts = async () => {
  try {
    const posts = await prismaClient.post.findMany({
      where: { isPublished: true, deletedAt: null },
      select: BASE_POSTS_SELECT,
      orderBy: { publicationDate: "desc" },
      take: 9,
    });

    const formattedPosts = posts.map(
      ({
        _count,
        tags,
        reactions,
        thumbnail,
        author: { avatar, ...restAuthor },
        ...rest
      }) => ({
        ...rest,
        views: _count.views,
        comments: _count.comments,
        likes: reactions.filter((r) => r.isLike).length,
        dislikes: reactions.filter((r) => !r.isLike).length,
        thumbnailUrl: thumbnail?.publicPath || null,
        tags: tags.map((t) => t.name),
        author: { ...restAuthor, avatarUrl: avatar?.publicPath || null },
      })
    );

    return { data: formattedPosts };
  } catch (error) {
    console.error("Error fetching latest published posts:", error);
    return { message: "Something went wrong while fetching posts" };
  }
};

"use server";

import prismaClient from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const getMyTopPosts = async () => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  try {
    const posts = await prismaClient.post.findMany({
      where: {
        author: { clerkId: userId },
        isPublished: true,
        deletedAt: null,
      },
      select: {
        id: true,
        title: true,
        reactions: { select: { isLike: true } },
        views: { select: { userId: true } },
        comments: { select: { id: true } },
      },
      orderBy: [
        { views: { _count: "desc" } },
        { reactions: { _count: "desc" } },
        { comments: { _count: "desc" } },
        { publicationDate: "asc" },
      ],
      take: 5,
    });

    const postsWithAnalytics = posts.map((post) => {
      const likeCount = post.reactions.filter(
        (reaction) => reaction.isLike
      ).length;

      const dislikeCount = post.reactions.filter(
        (reaction) => !reaction.isLike
      ).length;

      const commentCount = post.comments.length;

      const totalViewsCount = post.views.length;

      const anonymousViewsCount = post.views.filter(
        (view) => !view.userId
      ).length;
      const authorizedViewsCount = totalViewsCount - anonymousViewsCount;

      return {
        id: post.id,
        title: post.title,
        comments: commentCount,
        reactions: {
          likes: likeCount,
          dislikes: dislikeCount,
        },
        views: {
          total: totalViewsCount,
          authorized: authorizedViewsCount,
          anonymous: anonymousViewsCount,
        },
      };
    });

    return { data: postsWithAnalytics };
  } catch (error) {
    console.error("Error fetching top posts:", error);
    return { message: "Something went wrong while fetching top posts" };
  }
};

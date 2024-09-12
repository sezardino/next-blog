"use server";

import prismaClient from "@/lib/prisma";
import { BaseGetRequest } from "@/types/base";
import {
  DEFAULT_PAGE_LIMIT,
  getBackendPagination,
} from "@/utils/get-pagination";
import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";

export const getMyPostsAction = async (data: BaseGetRequest) => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  const { page = 0, limit = DEFAULT_PAGE_LIMIT } = data;

  const where: Prisma.PostWhereInput = {
    author: { clerkId: userId },
    deletedAt: null,
  };

  try {
    const count = await prismaClient.post.count({ where });
    const { meta, skip, take } = getBackendPagination({ count, page, limit });

    const posts = await prismaClient.post.findMany({
      where,
      skip,
      take,
      select: {
        id: true,
        title: true,
        createdAt: true,
        publicationDate: true,
        reactions: { select: { isLike: true } },
        postViews: { select: { userId: true } },
        comments: { select: { id: true } },
      },
    });

    const postsWithAnalytics = posts.map((post) => {
      const likeCount = post.reactions.filter(
        (reaction) => reaction.isLike
      ).length;

      const dislikeCount = post.reactions.filter(
        (reaction) => !reaction.isLike
      ).length;

      const commentCount = post.comments.length;

      const totalViewsCount = post.postViews.length;

      const anonymousViewsCount = post.postViews.filter(
        (view) => !view.userId
      ).length;
      const authorizedViewsCount = totalViewsCount - anonymousViewsCount;

      return {
        id: post.id,
        title: post.title,
        createdAt: post.createdAt,
        publicationDate: post.publicationDate,
        likes: likeCount,
        dislikes: dislikeCount,
        comments: commentCount,
        views: {
          total: totalViewsCount,
          authorized: authorizedViewsCount,
          anonymous: anonymousViewsCount,
        },
      };
    });

    return { data: postsWithAnalytics, meta };
  } catch (error) {
    console.log(error);
    return { message: "There was an error when trying to fetch posts" };
  }
};

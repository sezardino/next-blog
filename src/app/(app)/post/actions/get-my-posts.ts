"use server";

import { DEFAULT_ITEMS_PER_PAGE } from "@/const/pagination";
import prismaClient from "@/lib/prisma";
import { BaseGetRequest } from "@/types/base";
import { getBackendPagination } from "@/utils/get-pagination";
import { checkIfPostWasPublished } from "@/utils/post";
import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";

export const getMyPostsAction = async (data: BaseGetRequest) => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  const { page = 1, limit = DEFAULT_ITEMS_PER_PAGE } = data;

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
        isPublished: true,
        publicationDate: true,
        reactions: { select: { isLike: true } },
        views: { select: { userId: true } },
        comments: { select: { id: true } },
      },
      orderBy: { createdAt: "desc" },
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
      const canChangePublicationStatus = checkIfPostWasPublished(
        post.isPublished,
        post.publicationDate
      );

      return {
        id: post.id,
        title: post.title,
        createdAt: post.createdAt,
        isPublished: post.isPublished,
        publicationDate: post.publicationDate,
        canChangePublicationStatus,
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

    return { data: postsWithAnalytics, meta };
  } catch (error) {
    console.log(error);
    return { message: "There was an error when trying to fetch posts" };
  }
};

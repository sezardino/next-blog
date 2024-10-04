"use server";

import { GRID_ITEMS_PER_PAGE } from "@/const/pagination";
import { BASE_POSTS_SELECT } from "@/const/post";
import prismaClient from "@/lib/prisma";
import { getBackendPagination } from "@/utils/get-pagination";
import { Prisma } from "@prisma/client";

type Args = {
  search?: string;
  page: number;
};

export const getSearchedPosts = async (args: Args) => {
  const { search = "", page = 1 } = args;

  const where: Prisma.PostWhereInput = {
    isPublished: true,
    deletedAt: null,
    OR: [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
      { body: { contains: search, mode: "insensitive" } },
      {
        OR: [
          { author: { firstName: { contains: search, mode: "insensitive" } } },
          { author: { lastName: { contains: search, mode: "insensitive" } } },
          { author: { email: { contains: search, mode: "insensitive" } } },
        ],
      },
    ],
  };

  try {
    const count = await prismaClient.post.count({ where });

    const { meta, skip, take } = getBackendPagination({
      count,
      page,
      limit: GRID_ITEMS_PER_PAGE,
    });

    const posts = await prismaClient.post.findMany({
      where,
      select: BASE_POSTS_SELECT,
      orderBy: { publicationDate: "desc" },
      skip,
      take,
    });

    const formattedPosts = posts.map(
      ({
        _count,
        tags,
        reactions,
        author: { avatar, ...restAuthor },
        thumbnail,
        ...rest
      }) => ({
        ...rest,
        views: _count.views,
        comments: _count.comments,
        likes: reactions.filter((r) => r.isLike).length,
        dislikes: reactions.filter((r) => !r.isLike).length,
        tags: tags.map((t) => t.name),
        thumbnailUrl: thumbnail?.publicPath || null,
        author: { ...restAuthor, avatarUrl: avatar?.publicPath || null },
      })
    );

    return {
      data: formattedPosts,
      meta,
    };
  } catch (error) {
    console.error("Error searching posts:", error);
    return { message: "Something went wrong while searching posts" };
  }
};

"use server";

import prismaClient from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import dayjs from "dayjs";

export const getMyPost = async (id: string) => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  try {
    const post = await prismaClient.post.findUnique({
      where: { id, author: { clerkId: userId }, deletedAt: null },
      select: {
        title: true,
        tags: true,
        thumbnailUrl: true,
        body: true,
        isPublished: true,
        publicationDate: true,
      },
    });

    if (!post) return { message: "Post not found" };

    return {
      ...post,
      canSchedulePublication:
        !dayjs(post.publicationDate).isValid() ||
        dayjs(post.publicationDate).isAfter(new Date()),
    };
  } catch (error) {
    console.log(error);
    return { message: "Something went wrong" };
  }
};

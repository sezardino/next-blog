"use server";

import prismaClient from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import dayjs from "dayjs";

export const setMyPostPublicationStatus = async (
  postId: string,
  isPublished: boolean
) => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  try {
    const neededPost = await prismaClient?.post.findUnique({
      where: { id: postId, author: { clerkId: userId }, deletedAt: null },
      select: { isPublished: true, publicationDate: true },
    });

    if (!neededPost) return { message: "Post not found" };
    const canChangePublicationStatus =
      neededPost.isPublished ||
      (!!neededPost.publicationDate &&
        dayjs(neededPost.publicationDate).isBefore(
          dayjs(new Date()).add(1, "day")
        ));

    if (canChangePublicationStatus)
      return {
        message:
          "Publication status can't be changed if post was't be published",
      };

    await prismaClient.post.update({
      where: { id: postId, author: { clerkId: userId }, deletedAt: null },
      data: { isPublished },
      select: { id: true },
    });
  } catch (error) {
    console.log(error);
    return { message: "Error when try to change post publication status" };
  }
};

"use server";
import prismaClient from "@/lib/prisma";
import { SchedulePost, SchedulePostSchema } from "@/schemas/schedule-post";

import {
  checkIfPostCanBeModified,
  checkIfPostCanBePublished,
} from "@/utils/post";
import { auth } from "@clerk/nextjs/server";

const errors = {
  "already-published": "Already published post can't edit publication date",
};

export const schedulePublicationDate = async (
  postId: string,
  data: SchedulePost
) => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  const { date } = SchedulePostSchema.parse(data);

  try {
    const neededPost = await prismaClient?.post.findUnique({
      where: { id: postId, author: { clerkId: userId }, deletedAt: null },
      select: { isPublished: true, publicationDate: true },
    });

    if (!neededPost) return { message: "Post not found" };
    const canChangePublicationDate = checkIfPostCanBeModified(
      neededPost.isPublished,
      neededPost.publicationDate
    );

    if (canChangePublicationDate)
      return {
        message: errors[canChangePublicationDate],
      };

    await prismaClient.post.update({
      where: { id: postId, author: { clerkId: userId } },
      data: {
        isPublished: checkIfPostCanBePublished(date),
        publicationDate: date,
      },
      select: { id: true },
    });
  } catch (error) {
    console.log(error);
    return { message: "Error when try to schedule post" };
  }
};

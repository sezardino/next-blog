"use server";

import prismaClient from "@/lib/prisma";
import { PostReadyForScheduleSchema } from "@/schemas/post";
import { checkIfPostWasPublished } from "@/utils/post";
import { zodValidateAndFormatErrors } from "@/utils/zod";

import { auth } from "@clerk/nextjs/server";

export const checkIfCanSchedulePublicationDate = async (postId: string) => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  try {
    const neededPost = await prismaClient?.post.findUnique({
      where: { id: postId, author: { clerkId: userId }, deletedAt: null },
      select: {
        isPublished: true,
        publicationDate: true,
        title: true,
        description: true,
        body: true,
        thumbnailUrl: true,
        tags: { select: { name: true } },
      },
    });

    if (!neededPost) return { message: "Post not found" };

    const { tags, isPublished, publicationDate, thumbnailUrl, ...rest } =
      neededPost;

    const wasPublished = checkIfPostWasPublished(isPublished, publicationDate);

    if (wasPublished) return { message: "This post was already published" };

    const canSchedulePublication = zodValidateAndFormatErrors(
      PostReadyForScheduleSchema,
      {
        ...rest,
        tags: tags.map((t) => t.name),
      }
    );

    return {
      canSchedule: canSchedulePublication.success,
      errors:
        "errors" in canSchedulePublication
          ? canSchedulePublication.errors
          : undefined,
      publicationDate,
    };
  } catch (error) {
    console.log(error);
    return { message: "Error when try to delete post" };
  }
};

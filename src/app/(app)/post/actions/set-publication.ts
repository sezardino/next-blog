"use server";

import { ProjectUrls } from "@/const";
import prismaClient from "@/lib/prisma";
import { checkIfPostWasPublished } from "@/utils/post";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

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
    const canChangePublicationStatus = checkIfPostWasPublished(
      neededPost.isPublished,
      neededPost.publicationDate
    );

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

    revalidatePath(ProjectUrls.myPosts);
  } catch (error) {
    console.log(error);
    return { message: "Error when try to change post publication status" };
  }
};

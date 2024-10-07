"use server";

import { ProjectUrls } from "@/const";
import prismaClient from "@/lib/prisma";
import { checkIfPostWasPublished } from "@/utils/post";
import { zodValidateAndFormatErrors } from "@/utils/zod";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
  isPublished: z.boolean(),
});

export const setMyPostPublicationStatus = async (
  postId: string,
  arg: unknown
) => {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  const validationResponse = zodValidateAndFormatErrors(schema, {
    isPublished: arg,
  });

  if (!validationResponse.success) {
    return { message: "Validation error", errors: validationResponse.errors };
  }

  const { isPublished } = validationResponse.data;

  try {
    const neededPost = await prismaClient?.post.findUnique({
      where: { id: postId, author: { clerkId: userId }, deletedAt: null },
      select: { isPublished: true, publicationDate: true },
    });

    if (!neededPost) return { message: "Post not found" };
    const postWasPublished = checkIfPostWasPublished(
      neededPost.isPublished,
      neededPost.publicationDate
    );

    if (neededPost.isPublished === isPublished)
      return {
        message: "Nothing to change",
      };

    if (!postWasPublished)
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

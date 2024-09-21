"use server";

import { ProjectUrls } from "@/const";
import prismaClient from "@/lib/prisma";
import { EditPostSchema, PostFormValues } from "@/schemas/post-form";
import { convertArrayToTags } from "@/utils/array-to-tags";
import {
  checkIfPostCanBeModified,
  checkIfPostCanBePublished,
} from "@/utils/post-dates";

import { auth } from "@clerk/nextjs/server";
import { redirect, RedirectType } from "next/navigation";

const errors = {
  "already-published": "Already published post can't edit publication date",
};

export const editPostAction = async (postId: string, data: PostFormValues) => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  const { body, description, tags, title, publicationDate } =
    EditPostSchema.parse(data);

  let editedPostId = "";

  try {
    const neededPost = await prismaClient.post.findUnique({
      where: { id: postId, author: { clerkId: userId } },
      select: { publicationDate: true, isPublished: true },
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

    const editedPost = await prismaClient.post.update({
      where: { id: postId, author: { clerkId: userId } },
      data: {
        body: body ?? body,
        tags: tags ?? convertArrayToTags(tags!),
        description: description ?? description,
        title: title ?? title,
        isPublished: checkIfPostCanBePublished(publicationDate),
        publicationDate: publicationDate ?? publicationDate,
      },
      select: { id: true },
    });

    editedPostId = editedPost.id;
  } catch (error) {
    console.log(error);
    return { message: "Error when try to edit post" };
  }

  if (editedPostId)
    redirect(ProjectUrls.myPost(editedPostId), RedirectType.replace);
};

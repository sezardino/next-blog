"use server";

import { setThumbnailForPost } from "@/actions/post";
import { ProjectUrls } from "@/const";
import prismaClient from "@/lib/prisma";
import { EditPostSchema } from "@/schemas/post";
import { checkIfPostCanBeModified, normalizeTags } from "@/utils/post";
import { zodValidateAndFormatErrors } from "@/utils/zod";

import { auth } from "@clerk/nextjs/server";
import { redirect, RedirectType } from "next/navigation";

const errors = {
  "already-published": "Already published post can't edit publication date",
};

export const editPostAction = async (postId: string, formData: FormData) => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  const validationResponse = zodValidateAndFormatErrors(
    EditPostSchema,
    Object.fromEntries(formData)
  );

  if (!validationResponse.success) {
    return { message: "Validation error", errors: validationResponse.errors };
  }

  const { tags, thumbnail, description, body, title } = validationResponse.data;

  let editedPostId = "";

  try {
    const neededPost = await prismaClient.post.findUnique({
      where: { id: postId, author: { clerkId: userId } },
      select: {
        publicationDate: true,
        isPublished: true,
        tags: { select: { name: true, _count: { select: { posts: true } } } },
      },
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

    const { tagsToRemovePermanent, tagsToRemove, tagsToAdd } =
      getTagsToDoAction(neededPost.tags, tags);

    if (tagsToRemovePermanent.length) {
      await prismaClient.tag.deleteMany({
        where: { name: { in: tagsToRemovePermanent.map((t) => t.name) } },
      });
    }

    const editedPost = await prismaClient.post.update({
      where: { id: postId, author: { clerkId: userId } },
      data: {
        body: body ?? body,
        tags: {
          disconnect: tagsToRemove.map((t) => ({ name: t.name })),
          connectOrCreate: tagsToAdd.map((name) => ({
            where: { name },
            create: { name },
          })),
        },
        description: description ?? description,
        title: title ?? title,
      },
      select: { id: true },
    });

    if (thumbnail) await setThumbnailForPost(userId, editedPost.id, thumbnail);

    editedPostId = editedPost.id;
  } catch (error) {
    console.log(error);
    return { message: "Error when try to edit post" };
  }

  if (editedPostId)
    redirect(ProjectUrls.myPost(editedPostId), RedirectType.replace);
};

type CurrentTag = {
  _count: { posts: number };
  name: string;
};

const getTagsToDoAction = (currentTags: CurrentTag[], newTags?: string[]) => {
  if (!newTags)
    return { tagsToAdd: [], tagsToRemove: [], tagsToRemovePermanent: [] };

  const formattedTags = newTags?.length ? normalizeTags(newTags) : [];
  const formattedCurrentTags = currentTags.map((t) => t.name);
  const tagsToRemovePermanent = currentTags.filter(
    (tag) => !formattedTags.includes(tag.name) && tag._count.posts <= 1
  );
  const tagsToRemove = currentTags.filter(
    (tag) => !formattedTags.includes(tag.name) && tag._count.posts > 1
  );
  const tagsToAdd = formattedTags.filter(
    (tag) => !formattedCurrentTags.includes(tag)
  );

  return { tagsToAdd, tagsToRemove, tagsToRemovePermanent };
};

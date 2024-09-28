"use server";

import { ProjectUrls } from "@/const";
import prismaClient from "@/lib/prisma";
import { EditPostSchema, PostFormValues } from "@/schemas/post";
import { checkIfPostCanBeModified, normalizeTags } from "@/utils/post";

import { auth } from "@clerk/nextjs/server";
import { redirect, RedirectType } from "next/navigation";

const errors = {
  "already-published": "Already published post can't edit publication date",
};

export const editPostAction = async (
  postId: string,
  data: Partial<PostFormValues>
) => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  const { body, description, tags, title } = EditPostSchema.parse(data);

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

    const formattedTags = tags?.length ? normalizeTags(tags) : [];
    const currentTags = neededPost.tags.map((t) => t.name);
    const tagsToRemovePermanent = neededPost.tags.filter(
      (tag) => !formattedTags.includes(tag.name) && tag._count.posts <= 1
    );
    const tagsToRemove = neededPost.tags.filter(
      (tag) => !formattedTags.includes(tag.name) && tag._count.posts > 1
    );
    const tagsToAdd = formattedTags.filter((tag) => !currentTags.includes(tag));

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

    editedPostId = editedPost.id;
  } catch (error) {
    console.log(error);
    return { message: "Error when try to edit post" };
  }

  if (editedPostId)
    redirect(ProjectUrls.myPost(editedPostId), RedirectType.replace);
};

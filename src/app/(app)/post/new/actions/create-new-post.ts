"use server";
import prismaClient from "@/lib/prisma";
import {
  CreatePostValues,
  PostFormSchema,
  PostReadyForScheduleSchema,
} from "@/schemas/post";
import { redirect, RedirectType } from "next/navigation";

import { ProjectUrls } from "@/const";
import { checkIfPostCanBePublished, normalizeTags } from "@/utils/post";
import { auth } from "@clerk/nextjs/server";
import dayjs from "dayjs";

export const createPostAction = async (data: CreatePostValues) => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  const { publicationDate, ...rest } = data;

  let newPostId = "";
  const isPublicationDateValid =
    !!publicationDate && dayjs(publicationDate).isValid();

  const { body, description, tags, title } = isPublicationDateValid
    ? PostReadyForScheduleSchema.parse(rest)
    : PostFormSchema.parse(rest);

  const isPublished =
    isPublicationDateValid && checkIfPostCanBePublished(publicationDate);

  try {
    const newPost = await prismaClient.post.create({
      data: {
        author: { connect: { clerkId: userId } },
        body,
        isPublished,
        publicationDate: isPublicationDateValid ? publicationDate : null,
        tags: {
          connectOrCreate: normalizeTags(tags).map((name) => ({
            where: { name },
            create: { name },
          })),
        },
        description,
        title,
      },
      select: { id: true },
    });

    newPostId = newPost.id;
  } catch (error) {
    console.log(error);
    return { message: "Error when try to create post" };
  }

  if (newPostId) redirect(ProjectUrls.myPost(newPostId), RedirectType.replace);
};

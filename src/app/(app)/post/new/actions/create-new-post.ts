"use server";
import prismaClient from "@/lib/prisma";
import { PostFormSchema, PostFormValues } from "@/schemas/post-form";
import { convertArrayToTags } from "@/utils/array-to-tags";
import { redirect, RedirectType } from "next/navigation";

import { ProjectUrls } from "@/const";
import { auth } from "@clerk/nextjs/server";
import dayjs from "dayjs";

export const createPostAction = async (data: PostFormValues) => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  let newPostId = "";

  const { body, description, tags, title, publicationDate } =
    PostFormSchema.parse(data);

  try {
    const newPost = await prismaClient.post.create({
      data: {
        author: { connect: { clerkId: userId } },
        body,
        tags: convertArrayToTags(tags),
        publicationDate: dayjs(publicationDate).isValid()
          ? publicationDate
          : null,
        isPublished: dayjs(publicationDate).isSame(new Date(), "date"),
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

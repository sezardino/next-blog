"use server";
import prismaClient from "@/lib/prisma";
import { PostFormSchema, PostFormValues } from "@/schemas/post-form";
import { redirect, RedirectType } from "next/navigation";

import { ProjectUrls } from "@/const";
import { normalizeTags } from "@/utils/post";
import { auth } from "@clerk/nextjs/server";

export const createPostAction = async (data: PostFormValues) => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  let newPostId = "";

  const { body, description, tags, title } = PostFormSchema.parse(data);

  try {
    const newPost = await prismaClient.post.create({
      data: {
        author: { connect: { clerkId: userId } },
        body,
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

"use server";

import prismaClient from "@/lib/prisma";
import { PostFormSchema, PostFormValues } from "@/schemas/post-form";
import { convertArrayToTags } from "@/utils/array-to-tags";
import { auth } from "@clerk/nextjs/server";

export const createPostAction = async (data: PostFormValues) => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  const { body, description, tags, title } = PostFormSchema.parse(data);

  try {
    const newPost = await prismaClient.post.create({
      data: {
        author: { connect: { clerkId: userId } },
        body,
        tags: convertArrayToTags(tags),
        // tags: convertArrayToTags(tags),
        description,
        title,
      },
      select: { id: true },
    });

    return { id: newPost.id };
  } catch (error) {
    console.log(error);
    return { message: "Error when try to create post" };
  }
};

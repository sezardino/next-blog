"use server";

import prismaClient from "@/lib/prisma";
import { PostFormSchema, PostFormValues } from "@/schemas/post-form";
import { convertArrayToTags } from "@/utils/array-to-tags";

import { auth } from "@clerk/nextjs/server";

type Args = PostFormValues;

export const editPostAction = async (postId: string, data: Args) => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  const { body, description, tags, title } =
    PostFormSchema.partial().parse(data);

  try {
    await prismaClient.post.update({
      where: { id: postId, author: { clerkId: userId } },
      data: {
        body: body ?? body,
        tags: tags ?? convertArrayToTags(tags!),
        description: description ?? description,
        title: title ?? title,
      },
      select: { id: true },
    });

    return { id: postId };
  } catch (error) {
    console.log(error);
    return { message: "Error when try to edit post" };
  }
};

"use server";

import { defaultPostsForSeed } from "@/const/seeds";
import prismaClient from "@/lib/prisma";
import { normalizeTags } from "@/utils/post";
import { auth } from "@clerk/nextjs/server";

import dayjs from "dayjs";

function generatePublicationDate(index: number): Date {
  if (index === 0) {
    return dayjs().startOf("day").toDate();
  }

  return dayjs()
    .add(index * 5, "day")
    .startOf("day")
    .toDate();
}

export const seedPostsForCurrentUser = async () => {
  const { userId } = auth();
  if (!userId) return { message: "User not provided" };

  const posts = defaultPostsForSeed.map((post, index) => ({
    ...post,
    publicationDate: generatePublicationDate(index),
    isPublished: index === 0,
  }));

  try {
    const existingPosts = await prismaClient.post.findMany({
      where: {
        author: { clerkId: userId },
        title: { in: posts.map((post) => post.title) },
      },
      select: { title: true },
    });

    // check what post already exist
    const existingTitles = existingPosts.map((post) => post.title);
    const newPosts = posts.filter(
      (post) => !existingTitles.includes(post.title)
    );

    if (newPosts.length === 0) {
      console.log("No new posts to create, all posts already exist.");
      return { message: "All posts already exist for the current user." };
    }

    const allTags = Array.from(
      new Set(normalizeTags(newPosts.map((p) => p.tags).flat()))
    );

    const existingTags = await prismaClient.tag.findMany({
      where: { name: { in: allTags } },
      select: { name: true },
    });

    const existingTagNames = existingTags.map((tag) => tag.name);
    const newTags = allTags.filter((tag) => !existingTagNames.includes(tag));

    await Promise.all([
      ...newTags.map((name) => prismaClient.tag.create({ data: { name } })),
      ...posts.map(({ tags, ...post }) =>
        prismaClient.post.create({
          data: {
            ...post,
            author: { connect: { clerkId: userId } },
            tags: {
              connect: normalizeTags(tags).map((name) => ({ name })),
            },
          },
        })
      ),
    ]);
  } catch (error) {
    console.error("Error creating seeds:", error);
    return { message: "There was an error when trying to seed posts" };
  }
};

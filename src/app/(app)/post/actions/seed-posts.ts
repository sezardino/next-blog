"use server";

import { ProjectUrls } from "@/const";
import prismaClient from "@/lib/prisma";

import { auth } from "@clerk/nextjs/server";

import { faker } from "@faker-js/faker";
import { revalidatePath } from "next/cache";

const generateFakePosts = (length: number) => {
  return Array.from({ length }, () => {
    const isPublished = faker.datatype.boolean();
    const publicationDate = isPublished
      ? faker.date.past()
      : faker.date.future();

    return {
      title: faker.lorem.sentence(),
      description: faker.lorem.sentence(),
      body: faker.lorem.paragraphs(3),
      tags: [faker.word.adjective(), faker.word.noun()],
      publicationDate,
      isPublished: faker.datatype.boolean(),
    };
  });
};

export const seedPostsForCurrentUser = async () => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  try {
    const posts = generateFakePosts(faker.number.int({ min: 100, max: 2000 }));

    await Promise.all(
      posts.map((post) =>
        prismaClient.post.create({
          data: {
            ...post,
            author: { connect: { clerkId: userId } },
          },
        })
      )
    );

    revalidatePath(ProjectUrls.myPosts);
  } catch (error) {
    console.error("Error creating seeds:", error);
    return { message: "There was an error when trying to seed posts" };
  }
};

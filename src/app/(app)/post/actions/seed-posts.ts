"use server";

import { ProjectUrls } from "@/const";
import prismaClient from "@/lib/prisma";

import { auth } from "@clerk/nextjs/server";

import { faker } from "@faker-js/faker";
import { revalidatePath } from "next/cache";

const generateFakePosts = (length: number) => {
  const isFutureDate = faker.datatype.boolean();
  const publicationDate = isFutureDate
    ? faker.date.future()
    : faker.date.past();

  return Array.from({ length }, () => ({
    title: faker.lorem.sentence(),
    description: faker.lorem.sentence(),
    body: faker.lorem.paragraphs(3),
    tags: [faker.word.adjective(), faker.word.noun()],
    publicationDate,
  }));
};

export const seedPostsForCurrentUser = async () => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  try {
    const posts = generateFakePosts(faker.number.int({ min: 5, max: 20 }));

    await Promise.all(
      posts.map((post) =>
        prismaClient.post.create({
          data: {
            ...post,
            author: { connect: { clerkId: userId } },
            publicationDate: new Date(),
          },
        })
      )
    );

    revalidatePath(ProjectUrls.myPosts);
    return { success: true };
  } catch (error) {
    console.error("Error creating seeds:", error);
    return { message: "There was an error when trying to seed posts" };
  }
};

"use server";

import { ProjectUrls } from "@/const";
import prismaClient from "@/lib/prisma";
import { normalizeTags } from "@/utils/post";

import { auth } from "@clerk/nextjs/server";

import { faker } from "@faker-js/faker";
import { revalidatePath } from "next/cache";

const generateFakePosts = (length: number) => {
  return Array.from({ length }, () => {
    const status = faker.helpers.arrayElement([
      "PUBLISHED",
      "SCHEDULED",
      "DRAFT",
    ]);
    const publicationDate =
      status === "PUBLISHED"
        ? faker.date.past()
        : status === "SCHEDULED"
        ? faker.date.future()
        : null;

    const tagsCount = faker.number.int({ min: 1, max: 10 });

    const tags = Array.from({ length: tagsCount }, () =>
      faker.word.adjective()
    );

    return {
      title: faker.lorem.sentence(),
      description: faker.lorem.sentence(),
      body: faker.lorem.paragraphs(3),
      tags,
      publicationDate,
      isPublished: status === "PUBLISHED",
    };
  });
};

export const seedPostsForCurrentUser = async () => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  try {
    const posts = generateFakePosts(faker.number.int({ min: 100, max: 2000 }));

    await Promise.all(
      posts.map(({ tags, ...post }) =>
        prismaClient.post.create({
          data: {
            ...post,
            author: { connect: { clerkId: userId } },
            tags: {
              connectOrCreate: normalizeTags(tags).map((name) => ({
                where: { name },
                create: { name },
              })),
            },
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

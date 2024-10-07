import { defaultPostsForSeed } from "@/const/seeds";
import prismaClient from "@/lib/prisma"; // Импорт клиента Prisma
import { normalizeTags } from "@/utils/post";
import { NextResponse } from "next/server";

import dayjs from "dayjs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");

  const SEED_SECRET = process.env.SEED_SECRET;

  if (!userId || !secret) {
    return NextResponse.json(
      { message: "Missing userId or secret" },
      { status: 400 }
    );
  }

  if (secret !== SEED_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    const user = await prismaClient.user.findUnique({
      where: { id: String(userId) },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const result = await seed(String(userId));

    return NextResponse.json(
      {
        message: "Posts seeded successfully",
        details: result,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error seeding posts:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

const handleTags = async (allTags: string[]) => {
  const existingTags = await prismaClient.tag.findMany({
    where: { name: { in: allTags } },
    select: { name: true },
  });

  const existingTagNames = existingTags.map((tag) => tag.name);

  const newTags = allTags.filter((tag) => !existingTagNames.includes(tag));

  if (newTags.length > 0) {
    await Promise.all(
      newTags.map((name) => prismaClient.tag.create({ data: { name } }))
    );
  }
};

const generateNewPublicationDates = <T>(
  posts: T[],
  lastPublicationDate: Date | null
) => {
  const baseDate = lastPublicationDate ? dayjs(lastPublicationDate) : dayjs();

  return posts.map((post, index) => {
    const publicationDate = baseDate.add(index * 5, "day").toDate();
    return {
      ...post,
      publicationDate,
    };
  });
};

const seed = async (userId: string) => {
  const posts = defaultPostsForSeed.map((post, index) => ({
    ...post,
    isPublished: index === 0,
  }));

  const existingPosts = await prismaClient.post.findMany({
    where: {
      author: { clerkId: userId },
      title: { in: posts.map((post) => post.title) },
    },
    select: { title: true, publicationDate: true },
  });

  const existingTitles = existingPosts.map((post) => post.title);
  const lastPublicationDate =
    existingPosts.length > 0
      ? existingPosts[existingPosts.length - 1].publicationDate
      : null;

  const newPosts = posts.filter((post) => !existingTitles.includes(post.title));

  if (newPosts.length === 0) {
    console.log("No new posts to create, all posts already exist.");
    return { message: "All posts already exist for the current user." };
  }

  const postsWithUpdatedDates = generateNewPublicationDates(
    newPosts,
    lastPublicationDate
  );

  const allTags = Array.from(
    new Set(normalizeTags(postsWithUpdatedDates.map((p) => p.tags).flat()))
  );

  await handleTags(allTags);

  try {
    await Promise.all(
      postsWithUpdatedDates.map(({ tags, ...post }) =>
        prismaClient.post.create({
          data: {
            ...post,
            author: { connect: { id: userId } },
            tags: { connect: normalizeTags(tags).map((name) => ({ name })) },
          },
        })
      )
    );

    return { message: `${postsWithUpdatedDates.length} posts added.` };
  } catch (error) {
    console.error("Error creating seeds:", error);
    return { message: "There was an error when trying to seed posts" };
  }
};

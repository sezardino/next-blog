import prismaClient from "@/lib/prisma";
import dayjs from "dayjs";
import type { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const today = dayjs().startOf("day").toDate();

  console.log(`Next-blog cron job handle: ${today}`);

  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  try {
    const postsToPublish = await prismaClient.post.findMany({
      where: {
        publicationDate: today,
        isPublished: false,
      },
    });

    if (postsToPublish.length > 0) {
      await prismaClient.post.updateMany({
        where: { id: { in: postsToPublish.map((post) => post.id) } },
        data: { isPublished: true },
      });

      console.log(`${postsToPublish.length} post(s) published.`);
    } else {
      console.log("No posts to publish today.");
    }
  } catch (error) {
    console.error("Error publishing posts:", error);
  }

  console.log({ success: true });
  console.log(`Next-blog cron finished`);
  return Response.json({ success: true });
};

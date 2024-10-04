import type { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  try {
    // TODO: publish posts
  } catch (error) {
    console.log(error);
  }

  console.log({ success: true });
  return Response.json({ success: true });
};

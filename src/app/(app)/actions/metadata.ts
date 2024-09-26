import prismaClient from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const getDashboardMetadata = async () => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  try {
    const user = await prismaClient.user.findUnique({
      where: { clerkId: userId },
      select: { email: true, firstName: true, lastName: true },
    });

    if (!user) return { message: "Not found" };

    return user;
  } catch (error) {
    return { message: "Something Wrong when try to fetch current user data" };
  }
};

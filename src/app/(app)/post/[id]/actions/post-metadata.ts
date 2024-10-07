import prismaClient from "@/lib/prisma";

export const getPostMetadata = async (postId: string) => {
  try {
    const post = await prismaClient.post.findUnique({
      where: { id: postId },
      select: { title: true, description: true },
    });

    if (!post) return { message: "Not found" };

    return post;
  } catch (error) {
    return { message: "Something Wrong when try to fetch post metadata" };
  }
};

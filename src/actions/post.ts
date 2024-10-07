"use server";

import prismaClient from "@/lib/prisma";
import {
  deleteFileFromStorage,
  getFilePublicPath,
  uploadFileToStorage,
} from "@/lib/supabase/storage";

export const setThumbnailForPost = async (
  userClerkId: string,
  postId: string,
  thumbnail: File | null
) => {
  let createdThumbnailPath;

  try {
    const neededUser = await prismaClient.user.findUnique({
      where: { clerkId: userClerkId },
      select: { id: true },
    });

    if (!neededUser) return { message: "User not found" };

    const neededPost = await prismaClient.post.findUnique({
      where: { id: postId },
      select: { thumbnail: true },
    });

    if (!neededPost) return { message: "Post not found" };
    if (!thumbnail && !neededPost.thumbnail)
      return { message: "Thumbnail not provided" };

    // set new thumbnail
    if (thumbnail) {
      try {
        const response = await uploadFileToStorage(
          thumbnail,
          `${neededUser?.id}/post/${postId}`
        );

        if (response.error)
          return console.log({
            message:
              "Something went wrong when try to upload thumbnail to bucket",
            error: response.error,
          });

        createdThumbnailPath = response.data.path;
        await prismaClient.post.update({
          where: { id: postId },
          data: {
            thumbnail: {
              create: {
                ...response.data,
                publicPath: getFilePublicPath(response.data.path),
              },
            },
          },
        });
      } catch (error) {
        if (createdThumbnailPath) {
          console.log({
            message: "Something went wrong when try to set new image",
            error,
          });
          const deleteResponse = await deleteFileFromStorage(
            createdThumbnailPath
          );

          if (deleteResponse.error)
            console.log({
              message: "Something went wrong when try to delete new image",
              error,
            });
        } else {
          console.log({
            message:
              "Something went wrong when try to upload thumbnail to bucket",
            error,
          });
        }
      }
    }

    // delete thumbnail from post if provide null
    if (!thumbnail && neededPost.thumbnail) {
      const deleteResponse = await deleteFileFromStorage(
        neededPost.thumbnail?.path
      );

      await prismaClient.post.update({
        where: { id: postId },
        data: { thumbnail: { delete: true } },
      });

      if (deleteResponse.error)
        return {
          message: "Something went wrong when try to delete image from bucket",
          error: deleteResponse.error,
        };

      return { success: true };
    }

    if (createdThumbnailPath && neededPost.thumbnail) {
      const deleteResponse = await deleteFileFromStorage(
        neededPost.thumbnail.path
      );

      if (deleteResponse.error)
        return {
          message: "Something went wrong when try to delete image from bucket",
          error: deleteResponse.error,
        };

      prismaClient.file.delete({ where: { id: neededPost.thumbnail.id } });

      return { success: true };
    }
  } catch (error) {
    console.log(error);

    return { message: "Something went wrong when try set thumbnail for post" };
  }
};

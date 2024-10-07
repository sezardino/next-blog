"use server";
import prismaClient from "@/lib/prisma";
import {
  CreatePostSchema,
  PostFormSchema,
  PostReadyForScheduleSchema,
} from "@/schemas/post";
import { redirect, RedirectType } from "next/navigation";

import { ProjectUrls } from "@/const";
import {
  deleteFileFromStorage,
  getFilePublicPath,
  uploadFileToStorage,
} from "@/lib/supabase/storage";
import { checkIfPostCanBePublished, normalizeTags } from "@/utils/post";
import { zodValidateAndFormatErrors } from "@/utils/zod";
import { auth } from "@clerk/nextjs/server";
import dayjs from "dayjs";

export const createPostAction = async (formData: FormData) => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  const validationResponse = zodValidateAndFormatErrors(
    CreatePostSchema,
    Object.fromEntries(formData)
  );

  if (!validationResponse.success) {
    return { message: "Validation error", errors: validationResponse.errors };
  }

  const { publicationDate, ...rest } = validationResponse.data;

  let newPostId = "";
  const isPublicationDateValid =
    !!publicationDate && dayjs(publicationDate).isValid();

  const {
    body,
    description,
    tags = [],
    title,
    thumbnail,
  } = isPublicationDateValid
    ? PostReadyForScheduleSchema.parse(rest)
    : PostFormSchema.parse(rest);

  const isPublished =
    isPublicationDateValid && checkIfPostCanBePublished(publicationDate);

  try {
    const neededUser = await prismaClient.user.findUnique({
      where: { clerkId: userId },
      select: { id: true },
    });

    if (!neededUser) return { message: "User not found" };

    const newPost = await prismaClient.post.create({
      data: {
        author: { connect: { id: neededUser.id } },
        body,
        isPublished,
        publicationDate: isPublicationDateValid ? publicationDate : null,
        tags: {
          connectOrCreate: normalizeTags(tags).map((name) => ({
            where: { name },
            create: { name },
          })),
        },
        description,
        title,
      },
      select: { id: true },
    });

    let newThumbnailPath;
    if (thumbnail) {
      try {
        const response = await uploadFileToStorage(
          thumbnail,
          `${neededUser.id}/post/${newPost.id}`
        );

        if (response.error)
          return console.log({
            message:
              "Something went wrong when try to upload thumbnail to bucket",
            error: response.error,
          });

        newThumbnailPath = response.data.path;
        await prismaClient.post.update({
          where: { id: newPost.id },
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
        if (newThumbnailPath) {
          console.log({
            message: "Something went wrong when try to set new image",
            error,
          });
          const deleteResponse = await deleteFileFromStorage(newThumbnailPath);

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

    newPostId = newPost.id;
  } catch (error) {
    console.log(error);
    return { message: "Error when try to create post" };
  }

  if (newPostId) redirect(ProjectUrls.myPost(newPostId), RedirectType.replace);
};

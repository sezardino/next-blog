"use server";

import { ProjectUrls } from "@/const";
import prismaClient from "@/lib/prisma";
import {
  deleteFileFromStorage,
  getFilePublicPath,
  uploadFileToStorage,
} from "@/lib/supabase/storage";
import { UserAvatarSchema } from "@/schemas/user-avatar";
import { ServerActionResponse, SuccessResponse } from "@/types/base";
import { zodValidateAndFormatErrors } from "@/utils/zod";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const setUserAvatar = async (
  formData: FormData
): Promise<ServerActionResponse<SuccessResponse>> => {
  const { userId } = auth();
  if (!userId) return { message: "Unauthorized" };

  try {
    const currentUser = await prismaClient.user.findUnique({
      where: { clerkId: userId },
      include: { avatar: true },
    });

    if (!currentUser) return { message: "No user found" };

    const validationResponse = zodValidateAndFormatErrors(UserAvatarSchema, {
      avatar: formData.get("avatar"),
    });

    if (!validationResponse.success) {
      return { message: "Validation error", errors: validationResponse.errors };
    }

    const { data } = validationResponse;
    const image = data.avatar as File;

    const uploadResponse = await uploadFileToStorage(
      image,
      `${currentUser.id}/avatar`
    );

    if (!uploadResponse || uploadResponse.error)
      return {
        message: "Something went wrong wen try to upload a new avatar image",
      };

    try {
      await prismaClient?.user.update({
        where: { clerkId: userId },
        data: {
          avatar: {
            create: {
              ...uploadResponse.data,
              publicPath: getFilePublicPath(uploadResponse.data.path),
            },
          },
        },
      });

      if (currentUser.avatar) {
        await cleanUpAfterUpdateAvatar(currentUser.avatar.id);
      }
    } catch (error) {
      console.log(error);

      try {
        const response = await deleteFileFromStorage(uploadResponse.data.path);
        if (response.error)
          console.log({
            message:
              "Something whent wrong when try to delete new avatar after error",
            error: response.error,
          });
      } catch (error) {
        console.log({
          message:
            "Something when't wrong when try to delete new avatar after error",
          error,
        });
      }

      return { message: "Fail to update used avatar" };
    }

    revalidatePath(ProjectUrls.settings);
    return { success: true };
  } catch (error) {
    console.log(error);
    return { message: "There were error when try to change user avatar" };
  }
};

const cleanUpAfterUpdateAvatar = async (fileId: string) => {
  try {
    const neededFile = await prismaClient.file.findUnique({
      where: { id: fileId },
    });

    if (!neededFile) return { message: "No file found" };

    const response = await deleteFileFromStorage(neededFile.path);

    if (response.error)
      return { message: "Something went wrong when try to cleanup old avatar" };

    await prismaClient.file.delete({
      where: { id: fileId },
    });

    return { success: true };
  } catch (error) {
    return {
      message: "Something went wrong when try to delete old avatar",
    };
  }
};

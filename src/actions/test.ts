"use server";

import { createSSRClient } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { getCurrentUserData } from "./user";

const MAX_FILE_SIZE = 5000000;

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// VALIDATE IMAGE WITH ZOD
const imageSchema = z.object({
  image: z
    .any()
    .refine((file) => {
      if (file.size === 0 || file.name === undefined) return false;
      else return true;
    }, "Please update or add new image.")

    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    )
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`),
});

export async function uploadProfileImageAction(
  prevState: any,
  formData: FormData
) {
  // GET THE LOGGED IN USER
  const { userId } = await auth();
  if (!userId)
    throw new Error("You are not authorized to perform this action.");

  // CONVERT FORM DATA TO OBJECT
  const data = Object.fromEntries(formData);

  // VALIDATE THE IMAGE
  const validatedFields = imageSchema.safeParse({
    image: data.image,
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      error: null,
      data: null,
      message: "Invalid Image",
    };
  }

  const currentUser = await getCurrentUserData();
  const supabase = createSSRClient();

  if (!currentUser)
    return {
      ...prevState,
      error: null,
      zodErrors: null,
      message: "Unauthorized",
    };

  // DELETE PREVIOUS IMAGE IF EXISTS
  if (currentUser.avatarUrl) {
    try {
      await supabase.storage
        .from("storage")
        .remove([`avatars/${currentUser.avatarUrl}`]);
    } catch (error) {
      return {
        ...prevState,
        strapiErrors: null,
        zodErrors: null,
        message: "Failed to Delete Previous Image.",
      };
    }
  }

  const image = data.image as File;

  // UPLOAD NEW IMAGE TO MEDIA LIBRARY
  const fileUploadResponse = await supabase.storage
    .from("storage")
    .upload(image.name, image);

  if (!fileUploadResponse) {
    return {
      ...prevState,
      error: null,
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (fileUploadResponse.error) {
    return {
      ...prevState,
      error: fileUploadResponse.error,
      zodErrors: null,
      message: "Failed to Upload File.",
    };
  }
  const updatedImageId = fileUploadResponse.data.id;

  // UPDATE USER PROFILE WITH NEW IMAGE
  try {
    await prisma?.user.update({
      where: { id: currentUser.id },
      data: { avatarUrl: fileUploadResponse.data.fullPath },
    });
  } catch (error) {
    supabase.storage.from("storage").remove([fileUploadResponse.data.path]);
    return {
      ...prevState,
      error,
      zodErrors: null,
      message: "Fail to update used avatar",
    };
  }

  return {
    ...prevState,
    zodErrors: null,
    message: "Image Uploaded",
  };
}

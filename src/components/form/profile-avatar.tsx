"use client";

import {
  ACCEPTED_IMAGE_TYPES_FOR_AVATAR,
  UserAvatarFormValues,
  UserAvatarSchema,
} from "@/schemas/user-avatar";
import { CurrentUserData } from "@/types/user";
import { cn } from "@/utils/styles";
import { getUserAvatarFallback } from "@/utils/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { Trash } from "lucide-react";
import { ComponentPropsWithoutRef, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { Tooltip, TooltipContent } from "../ui/tooltip";

type ProfileAvatarFormProps = ComponentPropsWithoutRef<"form"> & {
  currentUser: CurrentUserData;
  onFormSubmit: (values: UserAvatarFormValues) => void;
  onTryToDeleteImage: () => void;
};

export const ProfileAvatarForm = (props: ProfileAvatarFormProps) => {
  const { currentUser, onFormSubmit, className, onTryToDeleteImage, ...rest } =
    props;
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(
    currentUser.avatarUrl
  );

  const form = useForm<UserAvatarFormValues>({
    resolver: zodResolver(UserAvatarSchema),
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      form.setValue("avatar", file, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    }
  };

  const handleDeleteImage = () => {
    if (currentUser.avatarUrl) return onTryToDeleteImage();

    setImagePreview(null);
    form.reset();

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <Form {...form}>
      <form
        {...rest}
        className={cn("flex flex-col gap-3", className)}
        onSubmit={form.handleSubmit(onFormSubmit)}
      >
        <div className="flex flex-col items-center gap-8 sm:flex-row">
          <div className="relative">
            <Avatar className="w-28 h-28 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500">
              <AvatarImage
                src={imagePreview || undefined}
                alt={`${currentUser.email} Avatar`}
                className="object-cover"
              />
              <AvatarFallback className="text-5xl">
                {getUserAvatarFallback(currentUser)}
              </AvatarFallback>
            </Avatar>
            {imagePreview && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size={"icon"}
                    color="destructive"
                    className="absolute top-0 right-0 translate-x-1/2"
                    onClick={handleDeleteImage}
                  >
                    <Trash />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Delete image</TooltipContent>
              </Tooltip>
            )}
          </div>

          <div className="flex gap-3 items-center flex-wrap">
            <Button asChild color={"secondary"} size={"sm"}>
              <label className="cursor-pointer">
                Select Image
                <input
                  ref={inputRef}
                  type="file"
                  accept={ACCEPTED_IMAGE_TYPES_FOR_AVATAR.join(",")}
                  onChange={handleImageChange}
                  className="sr-only"
                />
              </label>
            </Button>
            {form.formState.isDirty && (
              <Button type="submit" color={"success"} size={"sm"}>
                Submit
              </Button>
            )}
          </div>
        </div>
        {typeof form.formState.errors.avatar?.message === "string" && (
          <p className="text-red-500">{form.formState.errors.avatar.message}</p>
        )}
      </form>
    </Form>
  );
};

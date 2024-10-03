"use client";

import { PostForm } from "@/components/form/post-form";
import { ProjectUrls } from "@/const";
import { PostFormValues } from "@/schemas/post";
import { ServerActionResponse } from "@/types/base";
import { PostToEditData } from "@/types/post";
import { convertObjectToFormData } from "@/utils/convert-object-to-form-data";
import { getChangedFields } from "@/utils/post";
import { createActionHandler } from "@/utils/server-actions";
import { cn } from "@/utils/styles";
import { useRouter } from "next/navigation";
import { ComponentPropsWithRef, useState } from "react";
import { toast } from "sonner";
import { PostEditionDifferenceModal } from "./post-edition-difference-modal";

type EditMyPostProps = ComponentPropsWithRef<"section"> & {
  postId: string;
  post: PostToEditData;
  onEditPost: (values: FormData) => Promise<ServerActionResponse>;
};

export const EditMyPost = (props: EditMyPostProps) => {
  const { postId, onEditPost, post, className, ...rest } = props;
  const router = useRouter();
  const [difference, setDifference] =
    useState<Partial<PostFormValues | null>>(null);

  const submitHandler = ({ thumbnail, ...restValues }: PostFormValues) => {
    const { thumbnailUrl, ...fieldsToCheck } = post;
    const difference = getChangedFields<PostFormValues>(
      fieldsToCheck,
      restValues
    );

    if ((!thumbnailUrl && !!thumbnail) || (thumbnailUrl && thumbnail))
      difference.thumbnail = thumbnail;

    if (Object.keys(difference).length === 0) return;
    setDifference(difference);
  };

  const editPostHandler = createActionHandler({
    action: (values: Partial<PostFormValues>) => {
      const formData = convertObjectToFormData(values);

      if (values.thumbnail) formData.set("thumbnail", values.thumbnail);

      return onEditPost(formData);
    },
    onSuccess: () => {
      router.push(ProjectUrls.myPost(postId));
      toast.success("Post successfully edited");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const confirmHandler = () => {
    if (!difference || Object.keys(difference).length === 0) return;
    editPostHandler(difference);
  };

  return (
    <>
      <section {...rest} className={cn(className)}>
        <PostForm
          initialValues={post}
          onFormSubmit={submitHandler}
          onCancelClick={() => router.push(ProjectUrls.myPosts)}
        />
      </section>

      <PostEditionDifferenceModal
        isOpen={!!difference}
        post={post}
        difference={difference}
        onClose={() => setDifference(null)}
        onConfirm={confirmHandler}
      />
    </>
  );
};

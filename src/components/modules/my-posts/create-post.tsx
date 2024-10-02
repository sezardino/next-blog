"use client";

import { DateFormValues } from "@/components/form/date-form";
import { PostForm } from "@/components/form/post-form";
import { Toast } from "@/components/ui/toast";
import { ProjectUrls } from "@/const";
import { PostFormValues, PostReadyForScheduleSchema } from "@/schemas/post";
import { ServerActionResponse } from "@/types/base";
import { convertObjectToFormData } from "@/utils/convert-object-to-form-data";
import { createActionHandler } from "@/utils/server-actions";
import { ZodFormattedError, zodValidateAndFormatErrors } from "@/utils/zod";
import { useRouter } from "next/navigation";
import { ComponentPropsWithoutRef, useRef, useState } from "react";
import { toast } from "sonner";
import { PostScheduleModal } from "./post-schedule-modal";

type Props = ComponentPropsWithoutRef<"section"> & {
  onCreatePost: (values: FormData) => Promise<ServerActionResponse>;
};

export const CreatePostWrapper = (props: Props) => {
  const { onCreatePost, ...rest } = props;
  const router = useRouter();
  const submittedValue = useRef<PostFormValues | null>(null);
  const [isConformModalOpen, setIsConfirmModalOpen] = useState(false);
  const [valueErrors, setValueErrors] = useState<ZodFormattedError[]>([]);

  const submitHandler = (values: PostFormValues) => {
    submittedValue.current = values;

    const res = zodValidateAndFormatErrors(PostReadyForScheduleSchema, values);

    if (!res.success) setValueErrors(res.errors);

    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setValueErrors([]);
    setIsConfirmModalOpen(false);
  };

  const createPostHandler = createActionHandler({
    action: (values: PostFormValues & { publicationDate?: Date }) => {
      const formData = convertObjectToFormData(values);
      // console.log(Object.fromEntries(formData));
      // // if (values.thumbnail) formData.set("thumbnail", values.thumbnail);
      // console.log(Object.fromEntries(formData));

      // formData.set("title", values.title);
      if (values.thumbnail) formData.set("thumbnail", values.thumbnail);

      return onCreatePost(formData);
    },
    onSuccess: () => {
      setValueErrors([]);
      submittedValue.current = null;
      toast.success("Post was successful created");
    },
    onError: (error, zodErrors) => {
      toast.error(<Toast message={error} errors={zodErrors} />);
    },
  });

  const dialogConfirmHandler = () => {
    if (!valueErrors.length || !submittedValue.current) return;

    createPostHandler(submittedValue.current);
  };

  const submitScheduleFormHandler = (values?: DateFormValues) => {
    if (!submittedValue.current) return;

    createPostHandler({
      ...submittedValue.current,
      publicationDate: values?.date,
    });
  };

  return (
    <>
      <section {...rest}>
        <PostForm
          onFormSubmit={submitHandler}
          onCancelClick={() => router.push(ProjectUrls.myPosts)}
        />
      </section>

      <PostScheduleModal
        title="Finish post creation"
        isOpen={isConformModalOpen}
        errorMessage=""
        onClose={closeConfirmModal}
        errors={valueErrors}
        onConfirm={submitScheduleFormHandler}
        onSchedule={submitScheduleFormHandler}
      />
    </>
  );
};

"use client";

import { DateForm, DateFormValues } from "@/components/form/date-form";
import { PostForm } from "@/components/form/post-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Typography } from "@/components/ui/typography";
import { ProjectUrls } from "@/const";
import {
  CreatePostValues,
  PostFormValues,
  PostReadyForScheduleSchema,
} from "@/schemas/post";
import { SchedulePostSchema } from "@/schemas/schedule-post";
import { ServerActionResponse } from "@/types/base";
import { createActionHandler } from "@/utils/server-actions";
import { ZodFormattedError, zodValidateAndFormatErrors } from "@/utils/zod";
import { useRouter } from "next/navigation";
import { ComponentPropsWithoutRef, useRef, useState } from "react";
import { toast } from "sonner";

type Props = ComponentPropsWithoutRef<"section"> & {
  onCreatePost: (values: CreatePostValues) => Promise<ServerActionResponse>;
};

const SCHEDULE_FORM_ID = "SCHEDULE_FORM_ID";

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
    action: onCreatePost,
    onSuccess: () => {
      setValueErrors([]);
      submittedValue.current = null;
      toast.success("Post was successful created");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const dialogConfirmHandler = () => {
    if (!valueErrors.length || !submittedValue.current) return;

    createPostHandler(submittedValue.current);
  };

  const submitScheduleFormHandler = (values: DateFormValues) => {
    if (!submittedValue.current) return;

    createPostHandler({
      ...submittedValue.current,
      publicationDate: values.date,
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

      <AlertDialog open={isConformModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Post creation</AlertDialogTitle>
            <AlertDialogDescription>
              {!!valueErrors.length
                ? "If you wont schedule publication date for this post, you should fix the following errors:"
                : "Select date when you wont to publish this post"}
            </AlertDialogDescription>
          </AlertDialogHeader>

          {!!valueErrors.length && (
            <ul className="flex flex-col gap-1">
              {valueErrors.map((error) => (
                <Typography key={error.path} asChild styling="small">
                  <li>{error.message}</li>
                </Typography>
              ))}
            </ul>
          )}

          {!valueErrors.length && (
            <DateForm
              id={SCHEDULE_FORM_ID}
              label="Publication date"
              description="At this date post will be published (it can be changed if post is draft)"
              isLabelSR
              schema={SchedulePostSchema}
              onFormSubmit={submitScheduleFormHandler}
            />
          )}

          <AlertDialogFooter>
            <AlertDialogCancel onClick={closeConfirmModal}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              type={!valueErrors.length ? "submit" : undefined}
              form={!valueErrors.length ? SCHEDULE_FORM_ID : undefined}
              onClick={dialogConfirmHandler}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

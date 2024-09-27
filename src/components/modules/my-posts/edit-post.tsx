"use client";

import { PostForm } from "@/components/form/post-form";
import { BadgeList } from "@/components/ui/badge-list";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Typography } from "@/components/ui/typography";
import { ProjectUrls } from "@/const";
import { PostFormValues } from "@/schemas/post-form";
import { ServerActionResponse } from "@/types/base";
import { getChangedFields } from "@/utils/post";
import { createActionHandler } from "@/utils/server-actions";
import { cn } from "@/utils/styles";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { ComponentPropsWithRef, useState } from "react";
import { toast } from "sonner";

const PostBody = dynamic(() => import("../post/post-body/post-body"), {
  ssr: false,
  loading: () => <Skeleton className="h-96 w-full" />,
});

type EditMyPostProps = ComponentPropsWithRef<"section"> & {
  postId: string;
  post: PostFormValues;
  onEditPost: (
    values: Partial<PostFormValues>
  ) => Promise<ServerActionResponse>;
};

export const EditMyPost = (props: EditMyPostProps) => {
  const { postId, onEditPost, post, className, ...rest } = props;
  const router = useRouter();
  const [difference, setDifference] =
    useState<Partial<PostFormValues | null>>(null);

  const submitHandler = (values: PostFormValues) => {
    const difference = getChangedFields(post, values);

    if (Object.keys(difference).length === 0) return;
    setDifference(difference);
  };

  const editPostHandler = createActionHandler({
    action: onEditPost,
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

      <Dialog open={!!difference} onOpenChange={() => setDifference(null)}>
        <DialogContent className="max-w-4xl min-h-96">
          <DialogHeader>
            <DialogTitle>Confirm edition</DialogTitle>
            <DialogDescription>
              Check fields what you are change and confirm your changes.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-1 items-start">
              <Typography>Previous values</Typography>
              <Typography>New values</Typography>
            </div>
            <ul className="flex flex-col gap-4">
              {difference?.title && (
                <li className="flex flex-col gap-1">
                  <Typography>Title:</Typography>
                  <div className="grid grid-cols-2 gap-1 items-start">
                    <Typography styling="xs">{post.title}</Typography>
                    <Typography styling="xs">{difference.title}</Typography>
                  </div>
                </li>
              )}
              {difference?.description && (
                <li className="flex flex-col gap-1">
                  <Typography>Description:</Typography>
                  <div className="grid grid-cols-2 gap-1 items-start">
                    <Typography styling="xs">{post.description}</Typography>
                    <Typography styling="xs">
                      {difference.description}
                    </Typography>
                  </div>
                </li>
              )}
              {difference?.tags && (
                <li className="flex flex-col gap-1">
                  <Typography>Tags:</Typography>
                  <div className="grid grid-cols-2 gap-1 items-start">
                    <BadgeList list={post.tags} maxLength={Infinity} />
                    <BadgeList list={difference.tags} maxLength={Infinity} />
                  </div>
                </li>
              )}
              {difference?.body && (
                <li className="flex flex-col gap-1">
                  <Typography>Body:</Typography>
                  <div className="grid grid-cols-2 gap-1 items-start">
                    <PostBody body={post.body} size="xs" />
                    <PostBody body={difference.body} size="xs" />
                  </div>
                </li>
              )}
            </ul>
          </div>

          <DialogFooter className="mt-4 self-end sm:justify-between gap-2">
            <Button variant={"outline"} onClick={() => setDifference(null)}>
              Cancel
            </Button>
            <Button onClick={confirmHandler}>Edit post</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

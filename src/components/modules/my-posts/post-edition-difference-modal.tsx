"use client";

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
import { PostFormValues } from "@/schemas/post";
import { PostToEditData } from "@/types/post";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ReactNode } from "react";

const PostBody = dynamic(() => import("../post/post-body/post-body"), {
  ssr: false,
  loading: () => <Skeleton className="h-96 w-full" />,
});

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  post: PostToEditData;
  difference: Partial<PostFormValues | null>;
};

export const PostEditionDifferenceModal = (props: Props) => {
  const { post, difference, isOpen, onClose, onConfirm } = props;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
              <DifferenceItem
                title="Title"
                original={post.title}
                changed={difference.title}
                isWasEmpty={post.title.length === 0}
                render={(value) => (
                  <Typography styling="xs">{value}</Typography>
                )}
              />
            )}
            {difference?.description && (
              <DifferenceItem
                title="Description"
                original={post.description}
                changed={difference.description}
                isWasEmpty={post.description.length === 0}
                render={(value) => (
                  <Typography styling="xs">{value}</Typography>
                )}
              />
            )}
            {difference?.thumbnail && (
              <DifferenceItem
                title="Thumbnail"
                original={post.thumbnailUrl}
                changed={URL.createObjectURL(difference.thumbnail)}
                isWasEmpty={!post.thumbnailUrl}
                render={(value) => (
                  <Image
                    src={value!}
                    width={800}
                    height={400}
                    className="w-full aspect-video rounded-lg"
                    alt="thumbnail"
                  />
                )}
              />
            )}
            {difference?.tags && (
              <DifferenceItem
                title="Tags"
                original={post.tags}
                changed={difference.tags}
                isWasEmpty={post.tags.length === 0}
                render={(value) => (
                  <BadgeList list={value} maxLength={Infinity} />
                )}
              />
            )}
            {difference?.body && (
              <DifferenceItem
                title="Body"
                original={post.body}
                changed={difference.body}
                isWasEmpty={!post.body}
                render={(value) => <PostBody body={value} size="xs" />}
              />
            )}
          </ul>
        </div>

        <DialogFooter className="mt-4 self-end sm:justify-between gap-2">
          <Button variant={"outline"} onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>Edit post</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

type DifferenceItemProps<T> = {
  title: string;
  original: T;
  changed: T;
  isWasEmpty: boolean;
  render: (value: T) => ReactNode;
};

const DifferenceItem = <T,>({
  title,
  original,
  changed,
  isWasEmpty,
  render,
}: DifferenceItemProps<T>) => (
  <li className="flex flex-col gap-1">
    <Typography>{title}:</Typography>
    <div className="grid grid-cols-2 gap-1 items-start">
      {isWasEmpty ? (
        <Typography styling="xxs" className="text-muted-foreground">
          {title} was not provided
        </Typography>
      ) : (
        render(original)
      )}
      {render(changed)}
    </div>
  </li>
);

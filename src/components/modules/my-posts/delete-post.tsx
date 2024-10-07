"use client";

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
import { Skeleton } from "@/components/ui/skeleton";
import { ServerActionResponse } from "@/types/base";
import { createActionHandler } from "@/utils/server-actions";
import { toast } from "sonner";

type DeletePostModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDeletePost: () => Promise<ServerActionResponse>;
};

export const DeleteMyPostModal = async (props: DeletePostModalProps) => {
  const { isOpen, onClose, onDeletePost } = props;

  const deletePost = createActionHandler({
    action: onDeletePost,
    onSuccess: () => {
      onClose();
      toast.success("Post was successful deleted");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            post.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive/80"
            onClick={() => deletePost(undefined)}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const DeleteMyPostModalSkeleton = async () => {
  return (
    <AlertDialog open>
      <AlertDialogContent>
        <AlertDialogHeader>
          <Skeleton className="w-20 h-4" />
          <Skeleton className="w-full h-4" />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Skeleton className="w-20 h-10" />
          <Skeleton className="w-20 h-10" />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

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
import { useGenerateSearchParamsUrl } from "@/hooks/use-generate-search-params-url";
import { ServerActionResponse } from "@/types/base";
import { createActionHandler } from "@/utils/server-actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type DeletePostModalProps = {
  paramName: string;
  onDeletePost: () => Promise<ServerActionResponse>;
};

export const DeleteMyPostModal = async (props: DeletePostModalProps) => {
  const { paramName, onDeletePost } = props;

  const router = useRouter();

  const createPageURL = useGenerateSearchParamsUrl(paramName);

  const closeHandler = () => router.replace(createPageURL(""));

  const deletePost = createActionHandler({
    action: onDeletePost,
    onSuccess: () => {
      closeHandler();
      toast.success("Post was successful deleted");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  return (
    <AlertDialog open onOpenChange={closeHandler}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            post.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={closeHandler}>Cancel</AlertDialogCancel>
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

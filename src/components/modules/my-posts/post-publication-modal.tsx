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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Typography } from "@/components/ui/typography";
import { ServerActionResponse } from "@/types/base";
import { createActionHandler } from "@/utils/server-actions";
import { useState } from "react";
import { toast } from "sonner";

export type PostPublicationModalProps = {
  isOpen: boolean;
  isPostPublished: boolean;
  errorMessage: string;
  onClose: () => void;
  onSetPublication: (isPublished: boolean) => ServerActionResponse<{}>;
};

export const PostPublicationModal = (props: PostPublicationModalProps) => {
  const { isPostPublished, isOpen, errorMessage, onSetPublication, onClose } =
    props;
  const [value, setValue] = useState(isPostPublished);

  const hasProblems = !!errorMessage;

  const confirmHandler = createActionHandler({
    action: async () => {
      if (hasProblems) return onClose();

      return onSetPublication(value);
    },
    onSuccess: () => {
      onClose();
      toast.success("Successfully change publication status");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  return (
    <AlertDialog open={isOpen} onOpenChange={() => onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Change post publication status</AlertDialogTitle>
          <AlertDialogDescription>
            If you have any problem with post, you can change publication status
          </AlertDialogDescription>
        </AlertDialogHeader>

        {isOpen && hasProblems && (
          <div className="flex flex-col gap-2 py-5">
            <Typography weight="medium">Problems:</Typography>
            <ul className="flex flex-col gap-1">
              {errorMessage && (
                <Typography asChild styling="small">
                  <li>{errorMessage}</li>
                </Typography>
              )}
            </ul>
          </div>
        )}

        {isOpen && !hasProblems && (
          <Label className="flex items-center space-x-2 py-5">
            <Switch checked={value} onCheckedChange={setValue} />
            <span>
              Set publication status as{" "}
              <Typography level="span" weight="bold">
                {value ? "Published" : "Draft"}
              </Typography>
            </span>
          </Label>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onClose()}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => confirmHandler(undefined)}>
            Change publication status
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

"use client";

import { DateForm, DateFormValues } from "@/components/form/date-form";
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
import { SchedulePostSchema } from "@/schemas/schedule-post";
import { ZodFormattedError } from "@/utils/zod";
import { useState } from "react";

const SCHEDULE_FORM_ID = "SCHEDULE_FORM_ID";

export type PostScheduleModalProps = {
  isOpen: boolean;
  title: string;
  errorMessage: string;
  errors: ZodFormattedError[];
  noSwitch?: boolean;
  onClose: () => void;
  onSchedule: (values: DateFormValues) => void;
  onConfirm: () => void;
};

export const PostScheduleModal = (props: PostScheduleModalProps) => {
  const {
    title,
    noSwitch = false,
    isOpen,
    errors,
    errorMessage,
    onConfirm,
    onSchedule,
    onClose,
  } = props;
  const [showDateForm, setShowDateForm] = useState(noSwitch);

  const hasProblems = errors.length || !!errorMessage;

  const confirmHandler = () => {
    if (!errors.length && showDateForm) return;

    onConfirm();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={() => onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {hasProblems
              ? "If you wont schedule publication date for this post, you should fix the following errors:"
              : "Select date when you wont to publish this post"}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {isOpen && hasProblems && (
          <div className="flex flex-col gap-2">
            <Typography weight="medium">Problems:</Typography>
            <ul className="flex flex-col gap-1">
              {errors?.map((error) => (
                <Typography key={error.path} asChild styling="small">
                  <li>{error.message}</li>
                </Typography>
              ))}
              {errorMessage && (
                <Typography asChild styling="small">
                  <li>{errorMessage}</li>
                </Typography>
              )}
            </ul>
          </div>
        )}

        {isOpen && !hasProblems && (
          <>
            {!noSwitch && (
              <Label className="flex items-center space-x-2">
                <Switch
                  checked={showDateForm}
                  onCheckedChange={setShowDateForm}
                />
                <span>Set publication date</span>
              </Label>
            )}

            {showDateForm && (
              <DateForm
                id={SCHEDULE_FORM_ID}
                label="Publication date"
                description="At this date post will be published (it can be changed if post is draft)"
                isLabelSR
                schema={SchedulePostSchema}
                onFormSubmit={onSchedule}
              />
            )}
          </>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onClose()}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            type={!hasProblems && showDateForm ? "submit" : undefined}
            form={!hasProblems && showDateForm ? SCHEDULE_FORM_ID : undefined}
            onClick={confirmHandler}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

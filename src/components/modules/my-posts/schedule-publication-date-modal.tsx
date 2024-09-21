"use client";

import { DateForm, DateFormValues } from "@/components/form/date-form";
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
import { useGenerateSearchParamsUrl } from "@/hooks/use-generate-search-params-url";
import { SchedulePostSchema } from "@/schemas/schedule-post";
import { ServerActionResponse } from "@/types/base";
import { createActionHandler } from "@/utils/server-actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type SchedulePublicationDateModalProps = {
  initialDate: Date | null;
  paramName: string;
  onScheduleDate: (date: DateFormValues) => Promise<ServerActionResponse>;
};

const SCHEDULE_FORM_ID = "schedule-form";

export const SchedulePublicationDateModal = async (
  props: SchedulePublicationDateModalProps
) => {
  const { initialDate, paramName, onScheduleDate } = props;
  const router = useRouter();

  const createPageURL = useGenerateSearchParamsUrl(paramName);

  const closeHandler = () => router.replace(createPageURL(""));

  const scheduleDate = createActionHandler({
    action: onScheduleDate,
    onSuccess: () => {
      closeHandler();
      toast.success("Successfully scheduled post");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  return (
    <Dialog open onOpenChange={closeHandler}>
      <DialogContent className="grid grid-cols-1 gap-10">
        <DialogHeader>
          <DialogTitle>Schedule publication date</DialogTitle>
          <DialogDescription>
            Here you can schedule publication date for selected post
          </DialogDescription>
        </DialogHeader>
        <DateForm
          id={SCHEDULE_FORM_ID}
          label="Publication date"
          description="At this date post will be published (it can be changed if post is draft)"
          isLabelSR
          initialDate={initialDate || undefined}
          schema={SchedulePostSchema}
          onFormSubmit={scheduleDate}
        />
        <DialogFooter className="sm:justify-between">
          <Button variant={"outline"} onClick={closeHandler}>
            Cancel
          </Button>
          <Button form={SCHEDULE_FORM_ID} type="submit">
            Schedule publication date
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const SchedulePublicationDateModalSkeleton = async () => {
  return (
    <Dialog open>
      <DialogContent className="grid grid-cols-1 gap-10">
        <DialogHeader>
          <Skeleton className="w-2/4 h-5" />
          <Skeleton className="w-3/4 h-5" />
        </DialogHeader>
        <Skeleton className="w-full h-20" />
        <DialogFooter className="sm:justify-between">
          <Skeleton className="w-20 h-10" />
          <Skeleton className="w-48 h-10" />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

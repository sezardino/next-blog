import {
  PostScheduleModal,
  PostScheduleModalProps,
} from "@/components/modules/my-posts/post-schedule-modal";
import { checkIfCanSchedulePublicationDate } from "../actions/can-schedule-publication-date";
import { schedulePublicationDate } from "../actions/schedule-publication-date";

type Props = Pick<PostScheduleModalProps, "isOpen" | "onClose"> & {
  postId: string;
};

export const ScheduleModal = async (props: Props) => {
  const { postId, ...rest } = props;

  const schedulePublicationDateWithId = schedulePublicationDate.bind(
    null,
    postId
  );
  const checkResponse = await checkIfCanSchedulePublicationDate(postId);

  return (
    <PostScheduleModal
      {...rest}
      title="Schedule post publication date"
      noSwitch
      onConfirm={rest.onClose}
      onSchedule={schedulePublicationDateWithId}
      errors={checkResponse.errors || []}
      errorMessage={checkResponse.message || ""}
    />
  );
};

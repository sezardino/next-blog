import { SchedulePublicationDateModal } from "@/components/modules/my-posts/schedule-publication-date-modal";
import { getMyPostScheduledDate } from "../actions/get-publication-date";
import { schedulePublicationDate } from "../actions/schedule-publication-date";

type Props = {
  isOpen: boolean;
  postId?: string;
  paramName: string;
};

export const ScheduleModal = async (props: Props) => {
  const { isOpen, paramName, postId } = props;

  if (!postId || !isOpen) return;

  const schedulePublicationDateWithId = schedulePublicationDate.bind(
    null,
    postId
  );
  const postDate = await getMyPostScheduledDate(postId);

  if ("message" in postDate) return;

  return (
    <SchedulePublicationDateModal
      paramName={paramName}
      initialDate={postDate.publicationDate}
      onScheduleDate={schedulePublicationDateWithId}
    />
  );
};

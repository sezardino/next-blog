import { SchedulePublicationDateModal } from "@/components/modules/my-posts/schedule-publication-date-modal";
import { getPostScheduledDate } from "../actions/get-publication-date";
import { schedulePublicationDate } from "../actions/schedule-publication-date";

type Props = {
  postId?: string;
  paramName: string;
};

export const ScheduleModal = async (props: Props) => {
  const { paramName, postId } = props;

  if (!postId) return;

  const schedulePublicationDateWithId = schedulePublicationDate.bind(
    null,
    postId
  );
  const postDate = await getPostScheduledDate(postId);

  if ("message" in postDate) return;

  return (
    <SchedulePublicationDateModal
      paramName={paramName}
      initialDate={postDate.publicationDate}
      onScheduleDate={schedulePublicationDateWithId}
    />
  );
};

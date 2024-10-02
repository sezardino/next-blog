import { PostPublicationModal } from "@/components/modules/my-posts/post-publication-modal";
import { PostScheduleModalProps } from "@/components/modules/my-posts/post-schedule-modal";
import { checkMyPostPublicationStatus } from "../actions/post-publication-status";
import { setMyPostPublicationStatus } from "../actions/set-publication";

type Props = Pick<PostScheduleModalProps, "isOpen" | "onClose"> & {
  postId: string;
};

export const PublicationModal = async (props: Props) => {
  const { postId, ...rest } = props;

  const setPublicationStatus = setMyPostPublicationStatus.bind(null, postId);
  const checkResponse = await checkMyPostPublicationStatus(postId);

  return (
    <PostPublicationModal
      {...rest}
      isPostPublished={checkResponse.isPublished || false}
      onSetPublication={setPublicationStatus}
      errorMessage={checkResponse.message || ""}
    />
  );
};

import { DeleteMyPostModal } from "@/components/modules/my-posts/delete-post";
import { deleteMyPostById } from "../actions/delete";
import { isPostExistOnCurrentUser } from "../actions/is-post-exist";

type Props = {
  isOpen: boolean;
  postId?: string;
  paramName: string;
};

export const DeleteModal = async (props: Props) => {
  const { isOpen, paramName, postId } = props;

  if (!postId || !isOpen) return;

  const deletePostWithId = deleteMyPostById.bind(null, postId);
  const postExistResponse = await isPostExistOnCurrentUser(postId);

  if ("message" in postExistResponse) {
    return null;
  }

  return (
    <DeleteMyPostModal paramName={paramName} onDeletePost={deletePostWithId} />
  );
};

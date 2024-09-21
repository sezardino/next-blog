import { DeleteMyPostModal } from "@/components/modules/my-posts/delete-post";
import { toast } from "sonner";
import { deleteMyPostById } from "../actions/delete";
import { isPostExistOnCurrentUser } from "../actions/is-post-exist";

type Props = {
  postId: string;
  paramName: string;
};

export const DeleteModal = async (props: Props) => {
  const { paramName, postId } = props;

  if (!postId) return;

  const deletePostWithId = deleteMyPostById.bind(null, postId);
  const postExistResponse = await isPostExistOnCurrentUser(postId);

  if ("message" in postExistResponse) {
    toast.error(postExistResponse.message);

    return null;
  }

  return (
    <DeleteMyPostModal paramName={paramName} onDeletePost={deletePostWithId} />
  );
};

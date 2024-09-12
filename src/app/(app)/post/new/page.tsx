import { PostForm } from "@/components/form/post-form";
import { createPostAction } from "./actions/create-new-post";

const NewPostPage = () => {
  return (
    <main>
      <PostForm onFormSubmit={createPostAction} />
    </main>
  );
};

export default NewPostPage;

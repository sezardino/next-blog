import { createPostAction } from "@/actions/post";
import { PostForm } from "@/components/form/post-form";

const NewPostPage = () => {
  return (
    <main>
      <PostForm onFormSubmit={createPostAction} />
    </main>
  );
};

export default NewPostPage;

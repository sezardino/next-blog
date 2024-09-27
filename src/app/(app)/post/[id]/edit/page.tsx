import { EditMyPost } from "@/components/modules/my-posts/edit-post";
import { Typography } from "@/components/ui/typography";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { editPostAction } from "./actions/edit-post";
import { getMyPostForEdition } from "./actions/get-post";

type Props = { params: { id: string } };

export const metadata: Metadata = { title: "Edit post" };

const EditPostPage = async (props: Props) => {
  const post = await getMyPostForEdition(props.params.id);

  if (!post || "message" in post) notFound();

  const editPostWithId = editPostAction.bind(null, props.params.id);

  const { isPublished, publicationDate, thumbnailUrl, ...restPost } = post;

  return (
    <main className="grid grid-cols-1 gap-8">
      <header className="grid grid-cols-1 gap-2">
        <Typography level="h1" styling="h2">
          Edit Your Blog Post
        </Typography>
        <Typography styling="small">
          Update your existing blog post by modifying the fields below. You can
          adjust the title, description, tags, and main content. Follow the
          character limits and tag requirements to ensure proper formatting.
          Once you&apos;ve made your changes, submit the form to update your
          post.
        </Typography>
      </header>
      {JSON.stringify({ post })}
      <EditMyPost
        post={restPost}
        onEditPost={editPostWithId}
        postId={props.params.id}
      />
      {/* <PostForm
        initialValues={post}
        onFormSubmit={editPostWithId}
        isDateEditable={
          (!post.isPublished && !!post.publicationDate) ||
          dayjs(post.publicationDate).isAfter(new Date())
        }
      /> */}
    </main>
  );
};

export default EditPostPage;

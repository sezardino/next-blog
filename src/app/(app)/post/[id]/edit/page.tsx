// "use client";

import { PostForm } from "@/components/form/post-form";
import { Typography } from "@/components/ui/typography";
import { notFound } from "next/navigation";
import { editPostAction } from "./actions/edit-post";
import { getMyPostForEdition } from "./actions/get-post";

type Props = { params: { id: string } };

const EditPostPage = async (props: Props) => {
  const post = await getMyPostForEdition(props.params.id);

  if (!post || "message" in post) notFound();

  const editPostWithId = editPostAction.bind(null, props.params.id);

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
      <PostForm initialValues={post} onFormSubmit={editPostWithId} />
    </main>
  );
};

export default EditPostPage;

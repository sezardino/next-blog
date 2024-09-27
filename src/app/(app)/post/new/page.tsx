import { PostForm } from "@/components/form/post-form";
import { Typography } from "@/components/ui/typography";
import { Metadata } from "next";
import { createPostAction } from "./actions/create-new-post";

export const metadata: Metadata = { title: "Create mew post" };

const NewPostPage = () => {
  return (
    <main className="grid grid-cols-1 gap-8">
      <header className="grid grid-cols-1 gap-2">
        <Typography level="h1" styling="h2">
          Add a New Blog Post
        </Typography>
        <Typography styling="small">
          Create a new post by filling out the required fields below. Be sure to
          provide a title, a brief description, tags, and the main content for
          your blog post. Follow the character limits and tag requirements for
          optimal formatting. Once you&apos;re ready, submit your post to share
          it with your audience!
        </Typography>
      </header>
      <PostForm onFormSubmit={createPostAction} />
    </main>
  );
};

export default NewPostPage;

import { PostBody } from "@/components/modules/post/post-body/post-inner";
import { PostHeader } from "@/components/modules/post/post-header";
import { notFound } from "next/navigation";
import { getPost } from "./actiona/get-post";

type Props = {
  params: { id: string };
};

const PostPage = async (props: Props) => {
  const post = await getPost(props.params.id);

  if ("message" in post) return notFound();

  return (
    <main className="w-full max-w-3xl mx-auto pb-8 pt-4 md:pb-10 md:pt-8 lg:pb-16 flex flex-col gap-4">
      <PostHeader
        title={post.title}
        tags={post.tags}
        thumbnailUrl={post.thumbnailUrl}
      />
      <PostBody body={post.body} />
    </main>
  );
};

export default PostPage;

import { PostInner } from "@/components/base/post-inner/post-inner";
import { notFound } from "next/navigation";
import { getMyPost } from "./actions/get-post";

type Props = { params: { id: string } };

const MyPostPage = async (props: Props) => {
  const { params } = props;
  const post = await getMyPost(params.id);

  if (!post || "message" in post) notFound();

  return (
    <main className="w-full max-w-3xl mx-auto pb-8 pt-4 md:flex-row md:pb-10 md:pt-8 lg:pb-16">
      <PostInner
        title={post.title}
        tags={post.tags}
        thumbnailUrl={post.thumbnailUrl}
        body={post.body}
      />
    </main>
  );
};

export default MyPostPage;

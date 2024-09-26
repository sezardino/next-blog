import { PostBody } from "@/components/modules/post/post-body/post-inner";
import { PostHeader } from "@/components/modules/post/post-header";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Typography } from "@/components/ui/typography";
import { ProjectUrls } from "@/const";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DeleteModal } from "../components/delete-post";
import { ScheduleModal } from "../components/shedule-modal";
import { getMyPost } from "./actions/get-my-post";
import { MyPostSearchParams } from "./const";
import { Metadata } from "next";
import { getPostMetadata } from "./actions/post-metadata";

type Props = {
  params: { id: string };
  searchParams?: {
    [MyPostSearchParams.deletePost]?: string;
    [MyPostSearchParams.schedulePublicationDate]?: string;
  };
};

export const generateMetadata = async (props: {
  params: { id: string };
}): Promise<Metadata> => {
  const post = await getPostMetadata(props.params.id);

  if ("message" in post) return { title: "Post not found" };

  return post;
};

const MyPostPage = async (props: Props) => {
  const { params, searchParams } = props;
  const post = await getMyPost(params.id);
  const isScheduleModalOpen =
    searchParams?.[MyPostSearchParams.schedulePublicationDate] || "";
  const isDeleteModalOpen = searchParams?.[MyPostSearchParams.deletePost] || "";

  if (!post || "message" in post) notFound();

  return (
    <>
      <main className="w-full max-w-3xl mx-auto pb-8 pt-4 md:pb-10 md:pt-8 lg:pb-16 flex flex-col gap-4">
        <header className="flex flex-col gap-2">
          <Typography level="h1" styling="h2">
            Post content
          </Typography>
          <Typography>
            Here you can see all data related with post, and do some actions on
            post
          </Typography>
          <Breadcrumb className="-order-1">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link href={ProjectUrls.dashboard}>Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link href={ProjectUrls.myPosts}>My posts</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{post.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <section className="p-4 lg:p-10 border rounded-md">
          <PostHeader
            title={post.title}
            tags={post.tags}
            thumbnailUrl={post.thumbnailUrl}
          />
          <PostBody body={post.body} />
        </section>
      </main>

      <ScheduleModal
        isOpen={isScheduleModalOpen === "true"}
        postId={params.id}
        paramName={MyPostSearchParams.schedulePublicationDate}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen === "true"}
        postId={params.id}
        paramName={MyPostSearchParams.deletePost}
      />
    </>
  );
};

export default MyPostPage;

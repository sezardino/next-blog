import { Typography } from "@/components/ui/typography";
import { DEFAULT_PAGE_LIMIT } from "@/utils/get-pagination";

import { DeleteModal } from "./components/delete-post";
import { MyPostsSection } from "./components/my-posts";
import { ScheduleModal } from "./components/shedule-modal";
import { MyPostsSearchParams } from "./const";

const MyPostsPage = ({
  searchParams,
}: {
  searchParams?: {
    [MyPostsSearchParams.page]?: string;
    [MyPostsSearchParams.limit]?: string;
    [MyPostsSearchParams.schedulePublicationDate]?: string;
    [MyPostsSearchParams.deletePost]?: string;
  };
}) => {
  const page = Number(searchParams?.[MyPostsSearchParams.page]) || 1;
  const limit =
    Number(searchParams?.[MyPostsSearchParams.limit]) || DEFAULT_PAGE_LIMIT;
  const postToSchedulePublicationDate =
    searchParams?.[MyPostsSearchParams.schedulePublicationDate] || "";
  const postToDelete = searchParams?.[MyPostsSearchParams.deletePost] || "";

  return (
    <>
      <main className="grid grid-cols-1 gap-8">
        <header className="flex flex-col gap-2">
          <Typography level="h1" styling="h2">
            My posts
          </Typography>
          <Typography styling="small">
            Here you can find all posts that you write in our platform. Here you
            can find base analytics about your posts.
          </Typography>
        </header>

        <MyPostsSection page={page} limit={limit} />
      </main>

      <ScheduleModal
        postId={postToSchedulePublicationDate}
        paramName={MyPostsSearchParams.schedulePublicationDate}
      />

      <DeleteModal
        paramName={MyPostsSearchParams.deletePost}
        postId={postToDelete}
      />
    </>
  );
};

export default MyPostsPage;

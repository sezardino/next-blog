import { Typography } from "@/components/ui/typography";

import { DEFAULT_ITEMS_PER_PAGE } from "@/const/pagination";
import { DeleteModal } from "./components/delete-post";
import { MyPostsSection } from "./components/my-posts";
import { ScheduleModal } from "./components/shedule-modal";
import { MyPostsSearchParams } from "./const";

type Props = {
  searchParams?: {
    [MyPostsSearchParams.page]?: string;
    [MyPostsSearchParams.limit]?: string;
    [MyPostsSearchParams.schedulePublicationDate]?: string;
    [MyPostsSearchParams.deletePost]?: string;
  };
};

const MyPostsPage = ({ searchParams }: Props) => {
  const page = Number(searchParams?.[MyPostsSearchParams.page]) || 1;
  const limit =
    Number(searchParams?.[MyPostsSearchParams.limit]) || DEFAULT_ITEMS_PER_PAGE;
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
        isOpen={!!postToSchedulePublicationDate}
        postId={postToSchedulePublicationDate}
        paramName={MyPostsSearchParams.schedulePublicationDate}
      />

      <DeleteModal
        isOpen={!!postToDelete}
        paramName={MyPostsSearchParams.deletePost}
        postId={postToDelete}
      />
    </>
  );
};

export default MyPostsPage;

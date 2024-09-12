import { PaginationWidget } from "@/components/ui/pagination-widget";
import { Typography } from "@/components/ui/typography";
import { DEFAULT_PAGE_LIMIT } from "@/utils/get-pagination";
import { getMyPostsAction } from "./actions/get-posts";
import { MyPostsTable } from "./table";

const TABLE_PAGE_PATH_NAME = "page";
const TABLE_LIMIT_PATH_NAME = "limit";

const MyPostPage = async ({
  searchParams,
}: {
  searchParams?: {
    [TABLE_PAGE_PATH_NAME]?: string;
    [TABLE_LIMIT_PATH_NAME]?: string;
  };
}) => {
  const page = Number(searchParams?.[TABLE_PAGE_PATH_NAME]) || 1;
  const limit =
    Number(searchParams?.[TABLE_LIMIT_PATH_NAME]) || DEFAULT_PAGE_LIMIT;
  const posts = await getMyPostsAction({ page: page - 1, limit });

  return (
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

      <section className="flex flex-col gap-4">
        <MyPostsTable data={posts.data || []} />

        <PaginationWidget
          totalPages={posts.meta?.totalPages || 0}
          currentPage={posts.meta?.page || 0}
          paginationPathName={TABLE_PAGE_PATH_NAME}
          limitPathName={TABLE_LIMIT_PATH_NAME}
          currentLimit={posts.meta?.limit || DEFAULT_PAGE_LIMIT}
          className="ml-auto"
        />
      </section>
    </main>
  );
};

export default MyPostPage;

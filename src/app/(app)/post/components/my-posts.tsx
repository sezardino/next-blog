import { MyPostsTable } from "@/components/modules/my-posts/my-posts-table";
import { PaginationWidget } from "@/components/ui/pagination-widget";
import { getMyPostsAction } from "../actions/get-my-posts";
import { MyPostsSearchParams } from "../const";

type Props = {
  page: number;
  limit: number;
};

export const MyPostsSection = async (props: Props) => {
  const { limit, page } = props;
  const posts = await getMyPostsAction({ page, limit });

  return (
    <>
      <section className="flex flex-col gap-4">
        <div className="border rounded-md">
          <MyPostsTable data={posts.data || []} />
        </div>

        <PaginationWidget
          totalPages={posts.meta?.totalPages || 0}
          currentPage={page}
          paginationPathName={MyPostsSearchParams.page}
          limitPathName={MyPostsSearchParams.limit}
          currentLimit={limit}
          className="ml-auto"
        />
      </section>
    </>
  );
};

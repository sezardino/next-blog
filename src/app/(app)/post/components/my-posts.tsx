import { MyPostsTable } from "@/components/modules/my-posts/my-posts-table";
import { PaginationWidget } from "@/components/ui/pagination-widget";
import { DEFAULT_ITEMS_PER_PAGE } from "@/const/pagination";
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
    <section className="flex flex-col gap-4">
      <div className="border rounded-md">
        <MyPostsTable data={posts.data || []} />
      </div>

      <PaginationWidget
        totalPages={posts.meta?.totalPages || 0}
        currentPage={posts.meta?.page || 0}
        paginationPathName={MyPostsSearchParams.page}
        limitPathName={MyPostsSearchParams.limit}
        currentLimit={posts.meta?.limit || DEFAULT_ITEMS_PER_PAGE}
        className="ml-auto"
      />
    </section>
  );
};

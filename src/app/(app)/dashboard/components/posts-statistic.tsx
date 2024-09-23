import {
  PostsStatisticWidget,
  PostsStatisticWidgetProps,
} from "@/components/modules/dashboard/posts-statistic-widget";
import { getPostsStatistic } from "../actions/posts-statistic";

type OmittedProps = Omit<
  PostsStatisticWidgetProps,
  "total" | "published" | "scheduled" | "unpublished" | "draft"
>;

export const PostsStatistics = async (props: OmittedProps) => {
  const response = await getPostsStatistic();

  if ("message" in response) return null;

  const { draft, published, scheduled, total, unpublished } = response;

  return (
    <PostsStatisticWidget
      {...props}
      draft={draft}
      published={published}
      scheduled={scheduled}
      total={total}
      unpublished={unpublished}
    />
  );
};

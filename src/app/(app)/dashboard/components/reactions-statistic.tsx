import { ReactionsStatisticWidget } from "@/components/modules/dashboard/reactions-statistic-widget";
import { getMyPostsReactionsStatistics } from "../actions/reactions-statistic";

export const ReactionsStatistic = async () => {
  const response = await getMyPostsReactionsStatistics();

  if ("message" in response) return null;

  const { dislikes, likes, total } = response;

  return (
    <ReactionsStatisticWidget total={total} dislikes={dislikes} likes={likes} />
  );
};

import { MyTopPostsWidgetProps } from "@/components/modules/dashboard/top-posts-widget";
import { MyUpcomingPostsWidget } from "@/components/modules/dashboard/upcomming-posts-widget";
import { getMyUpcomingPosts } from "../actions/upcoming-posts";

type OmittedProps = Omit<MyTopPostsWidgetProps, "data">;

export const MyUpcomingPosts = async (props: OmittedProps) => {
  const response = await getMyUpcomingPosts();

  if ("message" in response) return null;

  const { data } = response;

  return <MyUpcomingPostsWidget {...props} data={data} />;
};

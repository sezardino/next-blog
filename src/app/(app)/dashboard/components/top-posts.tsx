import {
  MyTopPostsWidget,
  MyTopPostsWidgetProps,
} from "@/components/modules/dashboard/top-posts-widget";
import { getMyTopPosts } from "../actions/top-posts";

type OmittedProps = Omit<MyTopPostsWidgetProps, "data">;

export const MyTopPosts = async (props: OmittedProps) => {
  const response = await getMyTopPosts();

  if ("message" in response) return null;

  const { data } = response;

  return <MyTopPostsWidget {...props} data={data} />;
};

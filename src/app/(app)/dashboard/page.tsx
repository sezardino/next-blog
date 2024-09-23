import { PostsStatistics } from "./components/posts-statistic";
import { ReactionsStatistic } from "./components/reactions-statistic";
import { MyTopPosts } from "./components/top-posts";
import { MyUpcomingPosts } from "./components/upcoming-posts";
import { ViewsStatistic } from "./components/views-statistic";

const AppDashboardPage = () => {
  return (
    <>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <PostsStatistics className="sm:col-span-2" />
          <ReactionsStatistic />
          <ViewsStatistic />
        </section>

        <div className="grid gap-4 xl:grid-cols-2">
          <MyTopPosts />
          <MyUpcomingPosts />
        </div>
      </main>
    </>
  );
};

export default AppDashboardPage;

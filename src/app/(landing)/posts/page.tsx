import { SearchHero } from "@/components/modules/landing/seatch-hero";
import { ProjectUrls } from "@/const";
import { PostsSearchParams } from "./const";

type Props = {
  searchParams?: {
    [PostsSearchParams.search]?: string;
  };
};

const PostsPage = (props: Props) => {
  const currentSearch = props.searchParams?.[PostsSearchParams.search] || "";

  return (
    <main>
      <SearchHero
        searchParamName={PostsSearchParams.search}
        searchPathname={ProjectUrls.posts}
        isPostsPage
        initialValue={currentSearch}
      />
    </main>
  );
};

export default PostsPage;

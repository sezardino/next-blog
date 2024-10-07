import { PostsSection } from "@/components/modules/landing/posts-section";
import { SearchHero } from "@/components/modules/landing/seatch-hero";
import { PaginationWidget } from "@/components/ui/pagination-widget";
import { ProjectUrls } from "@/const";
import { GRID_ITEMS_PER_PAGE } from "@/const/pagination";
import { Metadata } from "next";
import { getSearchedPosts } from "./actions/search-posts";
import { PostsSearchParams } from "./const";

export const metadata: Metadata = { title: "All posts" };

type Props = {
  searchParams?: {
    [PostsSearchParams.search]?: string;
    [PostsSearchParams.page]?: string;
  };
};

const PostsPage = async ({ searchParams }: Props) => {
  const search = searchParams?.[PostsSearchParams.search] || "";
  const page = Number(searchParams?.[PostsSearchParams.page]) || 1;
  const posts = await getSearchedPosts({
    search,
    page,
  });

  return (
    <main>
      <SearchHero
        searchParamName={PostsSearchParams.search}
        searchPathname={ProjectUrls.posts}
        isPostsPage
        initialValue={search}
      />
      <PostsSection
        title="Posts what accept your search criteria"
        isTitleHidden
        posts={posts.data || []}
      >
        <footer className="flex justify-center">
          <PaginationWidget
            currentLimit={posts.meta?.limit || GRID_ITEMS_PER_PAGE}
            currentPage={page}
            totalPages={posts.meta?.totalPages || 0}
            paginationPathName={PostsSearchParams.page}
            hideLimit
          />
        </footer>
      </PostsSection>
    </main>
  );
};

export default PostsPage;

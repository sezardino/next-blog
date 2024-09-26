import { PostsSection } from "@/components/modules/landing/posts-section";
import { SearchHero } from "@/components/modules/landing/seatch-hero";
import { Button } from "@/components/ui/button";
import { ProjectUrls } from "@/const";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { getLatestPublishedPosts } from "./actions/latest-published-posts";
import { PostsSearchParams } from "./posts/const";

export const metadata: Metadata = { title: "Home" };

const HomePage = async () => {
  const blogPosts = await getLatestPublishedPosts();

  return (
    <main>
      <SearchHero
        searchParamName={PostsSearchParams.search}
        searchPathname={ProjectUrls.posts}
      />
      <PostsSection title="Latest posts" posts={blogPosts.data!}>
        <Button asChild variant={"outline"}>
          <Link href={ProjectUrls.posts} className="self-center">
            See more Posts <ArrowRight className="w-5 h-5 ml-1" />
          </Link>
        </Button>
      </PostsSection>
    </main>
  );
};

export default HomePage;

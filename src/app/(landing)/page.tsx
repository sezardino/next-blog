import { SearchHero } from "@/components/modules/landing/seatch-hero";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/ui/post-card";
import { Typography } from "@/components/ui/typography";
import { ProjectUrls } from "@/const";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getLatestPublishedPosts } from "./actions/latest-published-posts";
import { PostsSearchParams } from "./posts/const";

const HomePage = async () => {
  const blogPosts = await getLatestPublishedPosts();

  return (
    <main>
      <SearchHero
        searchParamName={PostsSearchParams.search}
        searchPathname={ProjectUrls.posts}
      />
      <section className="container flex flex-col gap-10">
        <Typography level="h2" styling="h1">
          Latest posts
        </Typography>
        <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {blogPosts.data?.map(({ id, ...post }) => (
            <li key={id}>
              <PostCard {...post} href={ProjectUrls.post(id)} />
            </li>
          ))}
        </ul>

        <Button asChild variant={"outline"}>
          <Link href={ProjectUrls.posts} className="self-center">
            See more Posts <ArrowRight className="w-5 h-5 ml-1" />
          </Link>
        </Button>
      </section>
    </main>
  );
};

export default HomePage;

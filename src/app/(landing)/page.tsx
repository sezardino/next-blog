import { SearchHero } from "@/components/modules/landing/seatch-hero";
import { PostCard } from "@/components/ui/post-card";
import { Typography } from "@/components/ui/typography";
import { ProjectUrls } from "@/const";
import { getPosts } from "./actions/posts";
import { PostsSearchParams } from "./posts/const";

const HomePage = async () => {
  const blogPosts = await getPosts();

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
        <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {blogPosts.map(({ id, ...post }) => (
            <li key={id}>
              <PostCard {...post} href={ProjectUrls.post(id)} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default HomePage;

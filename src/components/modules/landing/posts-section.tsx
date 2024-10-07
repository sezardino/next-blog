import { PostCard } from "@/components/ui/post-card";
import { Typography } from "@/components/ui/typography";
import { ProjectUrls } from "@/const";
import { BasePost } from "@/types/post";
import { cn } from "@/utils/styles";
import { ComponentPropsWithoutRef } from "react";

type PostsSectionProps = ComponentPropsWithoutRef<"section"> & {
  title: string;
  isTitleHidden?: boolean;
  posts: BasePost[];
};

export const PostsSection = (props: PostsSectionProps) => {
  const {
    title,
    isTitleHidden = false,
    posts,
    className,
    children,
    ...rest
  } = props;

  return (
    <section
      {...rest}
      className={cn("container flex flex-col gap-10", className)}
    >
      <Typography
        level="h2"
        styling="h1"
        className={cn(isTitleHidden && "sr-only")}
      >
        {title}
      </Typography>
      {!!posts.length && (
        <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {posts?.map(({ id, ...post }) => (
            <li key={id}>
              <PostCard {...post} href={ProjectUrls.post(id)} />
            </li>
          ))}
        </ul>
      )}

      {!posts.length && (
        <Typography styling="h1" className="text-center">
          No posts found
        </Typography>
      )}

      {children}
    </section>
  );
};

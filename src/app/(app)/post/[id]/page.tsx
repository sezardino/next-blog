import { Badge } from "@/components/ui/badge";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/utils/styles";
import parse from "html-react-parser";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getMyPost } from "./actions/get-post";
import styles from "./page.module.scss";

type Props = { params: { id: string } };

export const MyPostPage = async (props: Props) => {
  const { params } = props;
  const post = await getMyPost(params.id);

  if (!post || "message" in post) notFound();

  return (
    <main className="w-full max-w-3xl mx-auto pb-8 pt-4 md:flex-row md:pb-10 md:pt-8 lg:pb-16">
      <header className="flex flex-col w-full items-center gap-4">
        <div className="w-full max-w-3xl text-center flex flex-col gap-4">
          <Typography level="h1" styling="h1">
            {post.title}
          </Typography>
          {post.tags.length && (
            <ul className="flex flex-wrap justify-center gap-2">
              {post.tags.map((tag, index) => (
                <Badge key={`${tag}-${index}`} variant={"secondary"}>
                  <Typography styling="small">{tag}</Typography>
                </Badge>
              ))}
            </ul>
          )}
        </div>

        <Image
          src="/placeholder.png"
          alt="Post Cover Image"
          width={1200}
          height={600}
          className="w-full h-auto rounded-lg relative -order-1"
        />
      </header>
      <article className={cn(styles.body, "prose prose-sm mx-auto")}>
        {parse(post.body)}
      </article>
    </main>
  );
};

export default MyPostPage;

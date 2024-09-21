import { PostInner } from "@/components/modules/my-posts/post-inner/post-inner";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Typography } from "@/components/ui/typography";
import { ProjectUrls } from "@/const";
import { Calendar, Pencil } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMyPost } from "./actions/get-post";

type Props = { params: { id: string } };

const MyPostPage = async (props: Props) => {
  const { params } = props;
  const post = await getMyPost(params.id);

  if (!post || "message" in post) notFound();

  return (
    <main className="w-full max-w-3xl mx-auto pb-8 pt-4 md:pb-10 md:pt-8 lg:pb-16 flex flex-col gap-4">
      <PostInner
        title={post.title}
        tags={post.tags}
        thumbnailUrl={post.thumbnailUrl}
        body={post.body}
      />
      <header className="-order-1 flex items-center justify-end flex-wrap gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={"outline"}
              size={"icon"}
              aria-label="Edit post"
              asChild
            >
              <Link href={ProjectUrls.editMyPost(params.id)}>
                <Pencil className="w-4 h-4" />
              </Link>
            </Button>
          </TooltipTrigger>
          <Typography asChild styling="small">
            <TooltipContent>Edit post</TooltipContent>
          </Typography>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={"outline"} size={"icon"} aria-label="Edit post">
              <Calendar className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <Typography asChild styling="small">
            <TooltipContent>Schedule publication date</TooltipContent>
          </Typography>
        </Tooltip>
      </header>
    </main>
  );
};

export default MyPostPage;

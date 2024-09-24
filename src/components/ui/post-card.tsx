import { numberToReadableFormat } from "@/utils/post";
import { cn } from "@/utils/styles";
import {
  ArrowRight,
  Eye,
  MessageCircle,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";
import { BadgeList } from "./badge-list";
import { Button } from "./button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Typography } from "./typography";

type PostCardProps = ComponentPropsWithoutRef<"div"> & {
  title: string;
  thumbnail: string;
  description: string;
  author: string;
  tags: string[];
  views: number;
  comments: number;
  likes: number;
  dislikes: number;
  href: string;
};

export const PostCard = (props: PostCardProps) => {
  const {
    title,
    author,
    comments,
    description,
    dislikes,
    href,
    likes,
    tags,
    thumbnail,
    views,
    className,
    ...rest
  } = props;

  const statistics = [
    {
      icon: Eye,
      value: numberToReadableFormat(views),
    },
    {
      icon: MessageCircle,
      value: numberToReadableFormat(comments),
    },
    {
      icon: ThumbsUp,
      value: numberToReadableFormat(likes),
    },
    {
      icon: ThumbsDown,
      value: numberToReadableFormat(dislikes),
    },
  ];

  return (
    <Card
      {...rest}
      asChild
      className={cn(
        "p-0 overflow-hidden w-full h-full flex flex-col",
        className
      )}
    >
      <article>
        <CardHeader className="flex flex-col gap-2">
          <Typography asChild styling="h4" weight="bold">
            <CardTitle>{title}</CardTitle>
          </Typography>
          <CardDescription>{description}</CardDescription>
          <BadgeList list={tags} maxLength={3} className="-order-1" />
        </CardHeader>
        <CardFooter className="mt-auto pt-2 flex items-center flex-wrap gap-4 justify-between">
          <ul className="flex items-center gap-3">
            {statistics.map((s, i) => (
              <li key={i} className="flex items-center gap-1">
                <s.icon className="w-4 h-4 mr-1" />
                <Typography level="span" styling="xs">
                  {s.value}
                </Typography>
              </li>
            ))}
          </ul>
          <Button asChild variant={"link"}>
            <Link href={href}>
              Read more
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </CardFooter>
        <img
          className="aspect-video object-cover object-center -order-1"
          src="https://dummyimage.com/720x400"
          alt="blog"
        />
      </article>
    </Card>
  );
};

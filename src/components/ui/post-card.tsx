import { numberToReadableFormat } from "@/utils/post";
import { cn } from "@/utils/styles";
import { getUserAvatarFallback } from "@/utils/user";
import {
  ArrowRight,
  Eye,
  MessageCircle,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { BadgeList } from "./badge-list";
import { Button } from "./button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { Typography } from "./typography";

type PostCardProps = ComponentPropsWithoutRef<"div"> & {
  title: string;
  thumbnailUrl: string | null;
  description: string;
  author: {
    firstName: string | null;
    lastName: string | null;
    email: string;
    avatarUrl: string | null;
  };
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
    thumbnailUrl,
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
          <Typography asChild styling="large" weight="bold">
            <CardTitle>{title}</CardTitle>
          </Typography>
          <CardDescription>{description}</CardDescription>
          <BadgeList list={tags} maxLength={2} className="-order-1" />
        </CardHeader>
        <CardFooter className="mt-auto pt-2 flex items-center flex-wrap gap-4 justify-between">
          <div className="flex items-center gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src={author.avatarUrl || undefined}
                    alt={`${author.firstName} ${author.lastName} avatar`}
                  />
                  <AvatarFallback asChild>
                    <Typography styling="xs">
                      {getUserAvatarFallback(author)}
                    </Typography>
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                {author.lastName && author.lastName
                  ? `${author.firstName} ${author.lastName}`
                  : author.email}
              </TooltipContent>
            </Tooltip>
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
          </div>
          <Button asChild variant={"link"}>
            <Link href={href}>
              Read more
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </CardFooter>
        <Image
          src={thumbnailUrl ? thumbnailUrl : "/images/posts/placeholder.jpg"}
          width={720}
          height={400}
          className="aspect-video object-cover object-center -order-1"
          alt={`Image for post with title "${title}"`}
        />
      </article>
    </Card>
  );
};

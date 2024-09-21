import { Badge } from "@/components/ui/badge";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/utils/styles";
import parse from "html-react-parser";
import Image from "next/image";
import { ComponentPropsWithoutRef } from "react";
import styles from "./post-inner.module.scss";

type Props = ComponentPropsWithoutRef<"div"> & {
  title: string;
  tags: string[];
  thumbnailUrl: string | null;
  body: string;
};

export const PostInner = async (props: Props) => {
  const { title, tags, thumbnailUrl, body, className, ...rest } = props;

  return (
    <div {...rest} className={cn("", className)}>
      <header className="flex flex-col w-full items-center gap-4">
        <div className="w-full max-w-3xl text-center flex flex-col gap-4">
          <Typography level="h1" styling="h1">
            {title}
          </Typography>
          {!!tags.length && (
            <ul className="flex flex-wrap justify-center gap-2">
              {tags.map((tag, index) => (
                <Badge key={`${tag}-${index}`} variant={"secondary"}>
                  <Typography styling="small">{tag}</Typography>
                </Badge>
              ))}
            </ul>
          )}
        </div>

        <Image
          src={thumbnailUrl ? thumbnailUrl : "/placeholder.png"}
          alt="Post Cover Image"
          width={1200}
          height={600}
          className="w-full h-auto rounded-lg relative -order-1"
        />
      </header>
      <article className={cn(styles.body, "prose prose-sm mx-auto")}>
        {parse(body)}
      </article>
    </div>
  );
};

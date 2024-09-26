import { Badge } from "@/components/ui/badge";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/utils/styles";
import Image from "next/image";
import { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"div"> & {
  title: string;
  tags: string[];
  thumbnailUrl: string | null;
};

export const PostHeader = async (props: Props) => {
  const { title, tags, thumbnailUrl, className, ...rest } = props;

  return (
    <header
      {...rest}
      className={cn("flex flex-col w-full items-center gap-4", className)}
    >
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
        src={thumbnailUrl ? thumbnailUrl : "/images/posts/placeholder.jpg"}
        alt="Post Cover Image"
        width={1200}
        height={600}
        className="w-full h-auto rounded-lg relative -order-1"
      />
    </header>
  );
};

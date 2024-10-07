"use client";

import { cn } from "@/utils/styles";
import parse from "html-react-parser";
import { ComponentPropsWithoutRef } from "react";
import styles from "./post-body.module.scss";

type Props = ComponentPropsWithoutRef<"article"> & {
  body: string;
  size?: "xs" | "sm" | "md";
};

export const PostBody = async (props: Props) => {
  const { body, size = "md", className, ...rest } = props;

  return (
    <article
      {...rest}
      className={cn(styles.element, styles[size], "prose prose-sm", className)}
    >
      {parse(body)}
    </article>
  );
};

export default PostBody;

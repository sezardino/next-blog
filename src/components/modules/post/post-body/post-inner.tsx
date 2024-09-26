import { cn } from "@/utils/styles";
import parse from "html-react-parser";
import { ComponentPropsWithoutRef } from "react";
import styles from "./post-inner.module.scss";

type Props = ComponentPropsWithoutRef<"article"> & {
  body: string;
};

export const PostBody = async (props: Props) => {
  const { body, className, ...rest } = props;

  return (
    <article
      {...rest}
      className={cn(styles.element, "prose prose-sm mx-auto", className)}
    >
      {parse(body)}
    </article>
  );
};

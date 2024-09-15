import { cn } from "@/utils/styles";
import { Rss } from "lucide-react";
import Link from "next/link";
import { Typography } from "./typography";

type BrandLogoSizes = "sm" | "xl";

type BrandLogoProps = {
  href?: string;
  isTextHidden?: boolean;
  className?: string;
  size?: BrandLogoSizes;
};

const iconSizes: Record<BrandLogoSizes, string> = {
  sm: "w-6 h-6 sm:h-9 sm:w-9",
  xl: "w-6 h-6 sm:h-16 sm:w-16",
};

export const BrandLogo = (props: BrandLogoProps) => {
  const { size = "sm", isTextHidden, className, href } = props;

  const classNameString = cn("flex items-center", className);

  const inner = (
    <>
      <Rss className={cn("mr-3", iconSizes[size])} />
      <Typography
        level="span"
        className={cn("whitespace-nowrap", isTextHidden && "sr-only")}
      >
        Next-blog
      </Typography>
    </>
  );

  if (!href) return <div className={classNameString}>{inner}</div>;

  return (
    <Link href={href} className={classNameString}>
      {inner}
    </Link>
  );
};

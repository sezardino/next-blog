import { Rss } from "lucide-react";
import Link from "next/link";
import { Typography } from "./typography";

type BrandLogoProps = {
  href: string;
};

export const BrandLogo = (props: BrandLogoProps) => {
  const { href } = props;

  return (
    <Link href={href} className="flex items-center">
      <Rss className="mr-3 h-6 sm:h-9" />
      <Typography level="span" className="whitespace-nowrap">
        Next-blog
      </Typography>
    </Link>
  );
};

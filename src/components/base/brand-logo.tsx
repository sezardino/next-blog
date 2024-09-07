import { ProjectUrls } from "@/const";
import { Rss } from "lucide-react";
import Link from "next/link";
import { Typography } from "../ui/typography";

type BrandLogoProps = {
  href: keyof typeof ProjectUrls;
};

export const BrandLogo = (props: BrandLogoProps) => {
  const { href } = props;

  return (
    <Link href={ProjectUrls[href]} className="flex items-center">
      <Rss className="mr-3 h-6 sm:h-9" />
      <Typography level="span" className="whitespace-nowrap">
        Next-blog
      </Typography>
    </Link>
  );
};

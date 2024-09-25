"use client";

import { Ripple } from "@/components/magicui/ripple";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Typography } from "@/components/ui/typography";
import { useGenerateSearchParamsUrl } from "@/hooks/use-generate-search-params-url";
import { cn } from "@/utils/styles";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { ComponentPropsWithoutRef, FormEvent } from "react";

type SearchHeroProps = ComponentPropsWithoutRef<"section"> & {
  isPostsPage?: boolean;
  initialValue?: string;
  searchParamName: string;
  searchPathname: string;
};

export const SearchHero = (props: SearchHeroProps) => {
  const {
    isPostsPage,
    initialValue,
    searchParamName,
    searchPathname,
    className,
    ...rest
  } = props;
  const router = useRouter();
  const generateUrl = useGenerateSearchParamsUrl(
    searchParamName,
    searchPathname
  );

  const searchHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget);
    const { search }: { search: string } = {
      search: formData.get("search") as string,
    };

    if (!search && !isPostsPage) return;

    const path = generateUrl(search);

    isPostsPage ? router.replace(path) : router.push(path);
  };

  return (
    <section {...rest} className={cn("relative", className)}>
      <div className="container aspect-video flex flex-col justify-center items-center">
        <Ripple className="absolute inset-0 z-10" />
        <div className="container relative z-10 flex flex-col gap-10">
          <Typography
            level="h1"
            weight="medium"
            styling="h1"
            className="z-10 whitespace-pre-wrap text-center tracking-tighter"
          >
            Next-blog
          </Typography>
          <form className="flex items-center gap-2" onSubmit={searchHandler}>
            <Input
              name="search"
              defaultValue={initialValue}
              className="z-20 shadow-sm shadow-white"
            />
            <Button type="submit" size={"icon"} aria-label="Search">
              <Search />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

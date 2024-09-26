"use client";

import { Button } from "@/components/ui/button";
import { ProjectUrls } from "@/const";
import { CurrentUserData } from "@/types/user";
import { cn } from "@/utils/styles";
import { Rss } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentPropsWithoutRef, useState } from "react";
import { HamburgerButton } from "./hamburger-button";
import { UserDropdown } from "./user-dropdown";

const MOBILE_MENU_ID = "mobile-menu";

type LandingHeaderProps = ComponentPropsWithoutRef<"header"> & {
  user: CurrentUserData | null;
};

export const LandingHeader = (props: LandingHeaderProps) => {
  const { user, className, ...rest } = props;
  const pathname = usePathname();

  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const landingNavigationLinks = [
    { label: "Home", href: ProjectUrls.home },
    { label: "About", href: ProjectUrls.about },
    { label: "Road Map", href: ProjectUrls.roadMap },
    ...(user ? [{ label: "Dashboard", href: ProjectUrls.dashboard }] : []),
  ];

  return (
    <header
      {...rest}
      className={cn(
        "border-gray-200 px-4 lg:px-6 py-2.5 bg-muted/40 relative",
        isMenuOpened && "bg-muted/100",
        className
      )}
    >
      <nav>
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link href={ProjectUrls.home} className="flex items-center">
            <Rss className="mr-3 h-6 sm:h-9" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Next-blog
            </span>
          </Link>
          <div className="flex items-center lg:order-2">
            {!user && (
              <>
                <Button asChild variant={"ghost"}>
                  <Link href={ProjectUrls.login}>Log in</Link>
                </Button>

                <Button asChild variant={"ghost"}>
                  <Link href={ProjectUrls.registration}>Get started</Link>
                </Button>
              </>
            )}

            {user && <UserDropdown user={user} />}

            <HamburgerButton
              isActive={isMenuOpened}
              size={"sm"}
              variant={"ghost"}
              data-collapse-toggle={MOBILE_MENU_ID}
              type="button"
              className="ml-1 lg:hidden"
              onClick={() => setIsMenuOpened((prev) => !prev)}
              aria-controls={MOBILE_MENU_ID}
              aria-expanded={isMenuOpened}
            >
              <span className="sr-only">
                {isMenuOpened ? "Close" : "Open"} main menu
              </span>
            </HamburgerButton>
          </div>
          <div
            className={cn(
              "justify-between items-center w-full lg:flex lg:w-auto lg:order-1 ",
              !isMenuOpened && "hidden",
              isMenuOpened && "bg-muted/100 absolute top-full left-0 right-0"
            )}
            id={MOBILE_MENU_ID}
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {landingNavigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
                    aria-current={pathname === link.href ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

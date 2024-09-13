"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";

import { ProjectUrls } from "@/const";
import { useApplicationLogout } from "@/hooks/use-logout";
import { cn } from "@/utils/styles";
import {
  ClipboardCheck,
  ClipboardPlus,
  Grid,
  LogOut,
  LucideProps,
  Settings,
} from "lucide-react";
import Link from "next/link";
import {
  ComponentPropsWithRef,
  ForwardRefExoticComponent,
  Fragment,
  RefAttributes,
} from "react";
import { BrandLogo } from "../ui/brand-logo";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type ApplicationSidebarProps = ComponentPropsWithRef<"div"> & {};

type LinkInner = {
  label: string;
  href: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

type SideBarLink = Omit<LinkInner, "href" | "icon"> & {
  links?: LinkInner[];
};

type SidebarMenu = (LinkInner | SideBarLink)[];

const mainLinks: SidebarMenu = [
  { label: "Dashboard", href: ProjectUrls.dashboard, icon: Grid },
  {
    label: "Posts",
    links: [
      { label: "My posts", href: ProjectUrls.myPosts, icon: ClipboardCheck },
      { label: "Add new post", href: ProjectUrls.newPost, icon: ClipboardPlus },
    ],
  },
];

export const ApplicationSidebar = (props: ApplicationSidebarProps) => {
  const { className, ...rest } = props;
  const { logout } = useApplicationLogout();

  const footerLinks = [
    { label: "Settings", href: ProjectUrls.dashboard, icon: Settings },
    { label: "Log Out", onClick: logout, icon: LogOut },
  ];

  return (
    <Card {...rest} className={cn("h-screen px-0.5 flex flex-col", className)}>
      <CardHeader className="p-2 border-b">
        <BrandLogo href={ProjectUrls.dashboard} />
      </CardHeader>
      <CardContent className="p-2">
        <Accordion asChild type="single" collapsible>
          <nav>
            <ul>
              {mainLinks.map((item, index) => (
                <Fragment key={index}>
                  {"links" in item && (
                    <AccordionItem asChild value={item.label}>
                      <li className="border-none">
                        <Button
                          asChild
                          variant={"ghost"}
                          color={"secondary"}
                          className="w-full justify-between gap-1"
                        >
                          <AccordionTrigger>
                            <Typography level="span" styling="small">
                              {item.label}
                            </Typography>
                          </AccordionTrigger>
                        </Button>
                        <AccordionContent>
                          <ul className="pl-4">
                            {item.links?.map((link, index) => (
                              <SidebarLink key={link.href} {...link} />
                            ))}
                          </ul>
                        </AccordionContent>
                      </li>
                    </AccordionItem>
                  )}

                  {"href" in item && (
                    <li key={index}>
                      <SidebarLink {...item} />
                    </li>
                  )}
                </Fragment>
              ))}
            </ul>
          </nav>
        </Accordion>
      </CardContent>
      <CardFooter className="p-2 mt-auto justify-center">
        <ul className="flex items-center gap-2">
          {footerLinks.map((link, index) => (
            <li key={`${index}-${link.href}`}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    asChild={!!link.href}
                    variant={"ghost"}
                    color={"secondary"}
                    size={"icon"}
                    onClick={link.onClick}
                    aria-label={link.label}
                  >
                    {link.href ? (
                      <Link href={link.href}>
                        <link.icon className="h-5 w-5" />
                      </Link>
                    ) : (
                      <link.icon className="h-5 w-5" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <Typography level="span" styling="small">
                    {link.label}
                  </Typography>
                </TooltipContent>
              </Tooltip>
            </li>
          ))}
        </ul>
      </CardFooter>
    </Card>
  );
};

type SidebarLinkProps = {
  label: string;
  href: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

const SidebarLink = ({ label, href, icon: Icon }: SidebarLinkProps) => (
  <Button asChild variant={"ghost"} color={"secondary"}>
    <Link href={href} className="w-full !justify-start gap-1">
      <Icon className="h-5 w-5" />
      <Typography level="span" styling="small">
        {label}
      </Typography>
    </Link>
  </Button>
);

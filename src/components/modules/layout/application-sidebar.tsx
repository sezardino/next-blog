"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BrandLogo } from "@/components/ui/brand-logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Typography } from "@/components/ui/typography";

import { ProjectUrls } from "@/const";
import { useApplicationLogout } from "@/hooks/use-logout";
import { cn } from "@/utils/styles";
import { Slot } from "@radix-ui/react-slot";
import {
  ClipboardCheck,
  ClipboardPlus,
  Grid,
  LogOut,
  LucideProps,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ForwardRefExoticComponent,
  Fragment,
  RefAttributes,
} from "react";

type ApplicationSidebarProps = ComponentPropsWithRef<"div"> & {};

type LinkInner = {
  label: string;
  href: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

type SidebarLink = LinkInner;
type SidebarLinkList = Omit<LinkInner, "href" | "icon"> & {
  key: string;
  links: LinkInner[];
  startWith: string;
};

type SidebarMenu = (SidebarLink | SidebarLinkList)[];

const mainLinks: SidebarMenu = [
  { label: "Dashboard", href: ProjectUrls.dashboard, icon: Grid },
  {
    label: "Posts",
    key: "posts",
    startWith: ProjectUrls.myPosts,
    links: [
      { label: "My posts", href: ProjectUrls.myPosts, icon: ClipboardCheck },
      { label: "Add new post", href: ProjectUrls.newPost, icon: ClipboardPlus },
    ],
  },
];

export const ApplicationSidebar = (props: ApplicationSidebarProps) => {
  const { className, ...rest } = props;
  const { logout } = useApplicationLogout();
  const pathname = usePathname();

  const footerLinks = [
    { label: "Settings", href: ProjectUrls.dashboard, icon: Settings },
    { label: "Log Out", onClick: logout, icon: LogOut },
  ];

  const defaultOpenedAccordion = (
    mainLinks.filter(
      (m) => "key" in m && pathname.startsWith(m.startWith)
    ) as SidebarLinkList[]
  ).map((m) => m.key);

  return (
    <Card {...rest} className={cn("h-screen px-0.5 flex flex-col", className)}>
      <CardHeader className="p-2 border-b">
        <BrandLogo href={ProjectUrls.dashboard} />
      </CardHeader>
      <CardContent className="p-2">
        <Accordion
          asChild
          type="multiple"
          defaultValue={defaultOpenedAccordion}
        >
          <nav>
            <ul className="flex flex-col gap-1">
              {mainLinks.map((item, index) => (
                <Fragment key={index}>
                  {"links" in item && (
                    <AccordionItem asChild value={item.key}>
                      <li className="border-none">
                        <SidebarTrigger
                          asChild
                          isActive={pathname.startsWith(item.startWith)}
                        >
                          <AccordionTrigger>
                            <Typography level="span" styling="small">
                              {item.label}
                            </Typography>
                          </AccordionTrigger>
                        </SidebarTrigger>
                        <AccordionContent>
                          <ul className="pl-4 pt-1 flex flex-col gap-1">
                            {item.links?.map((link) => (
                              <li key={link.href}>
                                <SidebarTrigger
                                  asChild
                                  isActive={pathname === link.href}
                                >
                                  <SidebarLink {...link} />
                                </SidebarTrigger>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </li>
                    </AccordionItem>
                  )}

                  {"href" in item && (
                    <li key={index}>
                      <SidebarTrigger asChild isActive={pathname === item.href}>
                        <SidebarLink {...item} />
                      </SidebarTrigger>
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

type SidebarTriggerProps = ComponentPropsWithoutRef<"button"> & {
  asChild?: boolean;
  isActive: boolean;
};

const SidebarTrigger = (props: SidebarTriggerProps) => {
  const { asChild, className, isActive, children, ...rest } = props;

  const Comp = asChild ? Slot : "button";

  return (
    <>
      <Comp
        {...rest}
        className={cn(
          "flex py-2 px-4 rounded-lg hover:bg-secondary",
          "whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          isActive && "bg-secondary",
          className
        )}
      >
        {children}
      </Comp>
    </>
  );
};

type SidebarLinkProps = {
  label: string;
  href: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

const SidebarLink = ({
  label,
  href,
  icon: Icon,
  ...rest
}: SidebarLinkProps) => (
  <Link {...rest} href={href}>
    <Icon className="h-5 w-5 mr-1 inline" />
    <Typography level="span" styling="small">
      {label}
    </Typography>
  </Link>
);

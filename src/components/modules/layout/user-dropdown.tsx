"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Typography } from "@/components/ui/typography";
import { ProjectUrls } from "@/const";
import { useApplicationLogout } from "@/hooks/use-logout";
import { CurrentUserData } from "@/types/user";
import { cn } from "@/utils/styles";
import { getUserAvatarFallback } from "@/utils/user";
import { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import { LogOut, LucideProps, Plus, Settings } from "lucide-react";
import Link from "next/link";
import { ForwardRefExoticComponent, Fragment, RefAttributes } from "react";

type UserDropdownProps = DropdownMenuProps & {
  user: CurrentUserData;
  className?: string;
};

type Section = {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  label: string;
  href?: string;
  onClick?: () => void;
};

export const UserDropdown = (props: UserDropdownProps) => {
  const { user, className, ...rest } = props;
  const { logout } = useApplicationLogout();

  const menuSections: Section[][] = [
    [{ icon: Plus, label: "Write post", href: ProjectUrls.newPost }],
    [
      // { icon: User, label: "Profile", href: ProjectUrls.profile },
      { icon: Settings, label: "Settings", href: ProjectUrls.settings },
    ],
    [
      {
        icon: LogOut,
        label: "Log out",
        onClick: logout,
      },
    ],
  ];

  return (
    <DropdownMenu {...rest}>
      <DropdownMenuTrigger className={cn(className)}>
        <Avatar>
          <AvatarImage
            src={user.avatarUrl || undefined}
            alt={`Avatar of user with email ${user.email}`}
          />
          <AvatarFallback>
            {getUserAvatarFallback({
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
            })}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <Typography level="span" styling="small">
            {user.email} Account
          </Typography>
        </DropdownMenuLabel>

        {menuSections.map((section, index) => (
          <Fragment key={index}>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              {section.map((link, sectionIndex) => {
                const inner = (
                  <>
                    <link.icon className="mr-2 h-4 w-4" />
                    <Typography level="span" styling="small">
                      {link.label}
                    </Typography>
                  </>
                );

                return (
                  <DropdownMenuItem
                    key={sectionIndex}
                    asChild={!!link.href}
                    onClick={link.onClick}
                  >
                    {link.href ? <Link href={link.href}>{inner}</Link> : inner}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuGroup>
          </Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

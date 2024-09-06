"use client";

import { ProjectUrls } from "@/const";
import { cn } from "@/utils/styles";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

const links = [
  { name: "Public Profile", href: ProjectUrls.settings },
  { name: "Account Settings", href: ProjectUrls.accountSettings },
];

const SettingsLayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();

  return (
    <div className="w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row">
      <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
        <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">
          <h2 className="pl-3 mb-4 text-2xl font-semibold">Settings</h2>
          <nav>
            <ul>
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center px-3 py-2.5 font-semibold border-b border-transparent hover:text-neutral-400 hover:border-b-neutral-400",
                      link.href === pathname && "font-bold border-b-white"
                    )}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
      {children}
    </div>
  );
};

export default SettingsLayout;

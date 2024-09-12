"use client";

import { ApplicationSidebar } from "@/components/layout/application-sidebar";
import { HamburgerButton } from "@/components/layout/hamburger-button";
import { cn } from "@/utils/styles";
import { PropsWithChildren, useEffect, useState } from "react";

const SIDEBAR_ID = "sidebar-id";

const ApplicationLayout = ({ children }: PropsWithChildren) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const escPressHandler = (evt: KeyboardEvent) =>
      evt.key === "Escape" ? setIsSidebarOpen(false) : undefined;

    document.addEventListener("keydown", escPressHandler);

    return () => document.removeEventListener("keydown", escPressHandler);
  }, []);

  return (
    <div className="grid lg:grid-cols-[250px_1fr]">
      <div
        className={cn(
          "max-lg:fixed max-lg:top-0 max-lg:bottom-0 max-lg:left-0 max-lg:w-[250px] max-lg:z-10 transition-transform",
          !isSidebarOpen && "max-lg:-translate-x-full"
        )}
      >
        <ApplicationSidebar id={SIDEBAR_ID} className="lg:sticky lg:top-0" />
        <HamburgerButton
          isActive={isSidebarOpen}
          className="absolute bottom-5 -right-5 translate-x-full lg:hidden"
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          aria-controls={SIDEBAR_ID}
          aria-expanded={isSidebarOpen}
        >
          <span className="sr-only">
            {isSidebarOpen ? "Close" : "Open"} sidebar
          </span>
        </HamburgerButton>
      </div>
      <div
        className={cn(
          "min-h-screen container pt-5",
          isSidebarOpen && "max-lg:blur-sm"
        )}
        onClick={() => setIsSidebarOpen(false)}
      >
        {children}
      </div>
    </div>
  );
};

export default ApplicationLayout;

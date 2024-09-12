"use client";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { ButtonProps, buttonVariants } from "@/components/ui/button";

import { useGenerateSearchParamsUrl } from "@/hooks/use-generate-search-params-url";
import { getFrontendPagination } from "@/utils/get-pagination";
import { cn } from "@/utils/styles";
import Link, { LinkProps } from "next/link";
import { ComponentProps } from "react";

type CondProps = Omit<LinkProps, "onClick"> | Pick<ButtonProps, "onClick">;

type PaginationLinkProps = {
  isActive?: boolean;
  disabled?: boolean;
} & Pick<ButtonProps, "size" | "className" | "children"> &
  CondProps;

const PaginationLink = ({
  className,
  isActive,
  disabled,
  size = "icon",
  ...props
}: PaginationLinkProps) => {
  return (
    <>
      {"href" in props ? (
        <Link
          aria-current={isActive ? "page" : undefined}
          className={cn(
            buttonVariants({
              variant: isActive ? "outline" : "ghost",
              size,
            }),
            disabled && "pointer-events-none opacity-50",
            className
          )}
          {...props}
        />
      ) : (
        <button
          type="button"
          disabled={disabled}
          aria-current={isActive ? "page" : undefined}
          className={cn(
            buttonVariants({
              variant: isActive ? "outline" : "ghost",
              size,
            }),
            className
          )}
          {...props}
        />
      )}
    </>
  );
};

const PaginationEllipsis = ({
  className,
  ...props
}: ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);

export type PaginationProps = ComponentProps<"nav"> & {
  total: number;
  current: number;
  paramName?: string;
  onPageChange?: (page: number) => void;
};

export const Pagination = (props: PaginationProps) => {
  const { total, current, paramName, onPageChange, ...rest } = props;
  const createPageURL = useGenerateSearchParamsUrl(paramName);

  const allPages = getFrontendPagination(current, total);

  const generatePaginationLink = (pageNumber: number | string) => {
    if (!paramName) return "";

    return createPageURL(pageNumber);
  };

  return (
    <nav {...rest} role="navigation" aria-label="pagination">
      <ul className="flex flex-row items-center gap-1">
        <li>
          <PaginationLink
            aria-label="Go to previous page"
            size="default"
            className="gap-1 pl-2.5"
            href={
              !onPageChange ? generatePaginationLink(current - 1) : undefined
            }
            onClick={onPageChange ? () => onPageChange(current - 1) : undefined}
            disabled={current <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </PaginationLink>
        </li>
        {allPages.map((page) => (
          <li key={page}>
            {typeof page === "string" && <PaginationEllipsis />}
            {typeof page === "number" && (
              <PaginationLink
                href={!onPageChange ? generatePaginationLink(page) : undefined}
                onClick={onPageChange ? () => onPageChange(page) : undefined}
                isActive={page === current}
              >
                {page}
              </PaginationLink>
            )}
          </li>
        ))}
        <li>
          <PaginationLink
            aria-label="Go to next page"
            size="default"
            className="gap-1 pr-2.5"
            href={
              !onPageChange ? generatePaginationLink(current + 1) : undefined
            }
            onClick={onPageChange ? () => onPageChange(current + 1) : undefined}
            disabled={current >= total}
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </PaginationLink>
        </li>
      </ul>
    </nav>
  );
};

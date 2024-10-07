"use client";

import { useGenerateSearchParamsUrl } from "@/hooks/use-generate-search-params-url";
import { cn } from "@/utils/styles";
import { useRouter } from "next/navigation";
import { ComponentPropsWithoutRef } from "react";
import { Pagination } from "./pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

type PaginationWidgetProps = ComponentPropsWithoutRef<"div"> & {
  totalPages: number;
  currentPage: number;
  currentLimit: number;
  paginationPathName?: string;
  hideLimit?: boolean;
  limitPathName?: string;
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
};

const BASE_LIMIT_VALUES = [10, 20, 30, 40, 50];

export const PaginationWidget = (props: PaginationWidgetProps) => {
  const {
    totalPages,
    currentLimit,
    hideLimit = false,
    currentPage,
    paginationPathName,
    limitPathName,
    onPageChange,
    onLimitChange,
    className,
    ...rest
  } = props;
  const createPageURL = useGenerateSearchParamsUrl(limitPathName);
  const router = useRouter();

  const changeLimitHandler = (value: number) => {
    if (limitPathName) router.replace(createPageURL(value));

    if (onLimitChange) onLimitChange(value);
  };

  if (totalPages === 0) return null;

  return (
    <div
      {...rest}
      className={cn("inline-flex items-center gap-3 flex-wrap", className)}
    >
      <Pagination
        total={totalPages}
        current={currentPage}
        paramName={paginationPathName}
        onPageChange={onPageChange}
      />
      {!hideLimit && (
        <Select
          value={`${currentLimit}`}
          onValueChange={(value) => {
            changeLimitHandler(Number(value));
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={currentLimit} />
          </SelectTrigger>
          <SelectContent side="top">
            {BASE_LIMIT_VALUES.map((limit) => (
              <SelectItem key={limit} value={`${limit}`}>
                {limit}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

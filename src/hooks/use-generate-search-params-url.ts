"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useGenerateSearchParamsUrl = (
  paramName?: string,
  pathname?: string
) => {
  const currentPathname = usePathname();
  const searchParams = useSearchParams();

  return useCallback(
    (value: string | number, paramNameArg?: string) => {
      const params = new URLSearchParams(searchParams);
      const param = paramNameArg ? paramNameArg : paramName;

      if (param) params.set(param, value.toString());

      const neededPathName = pathname ? pathname : currentPathname;

      return `${neededPathName}?${params.toString()}`;
    },
    [currentPathname, paramName, pathname, searchParams]
  );
};

"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useGenerateSearchParamsUrl = (paramName?: string) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return useCallback(
    (value: string | number, paramNameArg?: string) => {
      const params = new URLSearchParams(searchParams);
      const param = paramNameArg ? paramNameArg : paramName;

      if (param) params.set(param, value.toString());

      return `${pathname}?${params.toString()}`;
    },
    [paramName, pathname, searchParams]
  );
};

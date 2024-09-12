"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useGenerateSearchParamsUrl = (paramName?: string) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return useCallback(
    (value: string | number) => {
      const params = new URLSearchParams(searchParams);

      if (paramName) params.set(paramName, value.toString());

      return `${pathname}?${params.toString()}`;
    },
    [paramName, pathname, searchParams]
  );
};

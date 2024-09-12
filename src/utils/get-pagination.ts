type Args = {
  page?: number;
  limit?: number;
  count: number;
};

export const DEFAULT_PAGE_LIMIT = 10;

export const getBackendPagination = (args: Args) => {
  const { page = 0, limit = DEFAULT_PAGE_LIMIT, count = 0 } = args;

  const transformedPage = Number(page);
  const transformedLimit = Number(limit);

  const totalPages = Math.ceil(count / limit);

  return {
    skip: transformedPage * transformedLimit,
    take: Number(transformedLimit),
    meta: {
      totalPages: totalPages < 0 ? 0 : totalPages,
      page: transformedPage + 1,
      limit: transformedLimit,
      count,
    },
  };
};

export const getFrontendPagination = (
  currentPage: number,
  totalPages: number
) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

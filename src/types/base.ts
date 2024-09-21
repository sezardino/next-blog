export type BaseGetRequest = {
  page?: number;
  limit?: number;
};

export type ServerActionResponse<T = void> = T | { message: string };

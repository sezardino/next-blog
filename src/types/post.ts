import { Post, User } from "@prisma/client";

export const BASE_POSTS_SELECT = {
  id: true,
  title: true,
  description: true,
  thumbnailUrl: true,
  publicationDate: true,
  tags: true,
  author: {
    select: {
      firstName: true,
      lastName: true,
      email: true,
      avatarUrl: true,
    },
  },
  reactions: { select: { isLike: true } },
  _count: {
    select: {
      views: true,
      comments: true,
    },
  },
};

export type BasePost = Pick<
  Post,
  "title" | "thumbnailUrl" | "description" | "id"
> & {
  author: Pick<User, "firstName" | "lastName" | "email"> & { avatarUrl: true };
  views: number;
  likes: number;
  dislikes: number;
  comments: number;
  tags: string[];
};

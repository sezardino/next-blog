import { Post, User } from "@prisma/client";

export const BASE_POSTS_SELECT = {
  id: true,
  title: true,
  description: true,
  thumbnail: { select: { publicPath: true } },
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

export type BasePost = Pick<Post, "title" | "description" | "id"> & {
  thumbnailUrl: string | null;
  author: Pick<User, "firstName" | "lastName" | "email"> & {
    avatarUrl: string | null;
  };
  views: number;
  likes: number;
  dislikes: number;
  comments: number;
  tags: string[];
};

export type PostToEditData = Pick<Post, "title" | "description" | "body"> & {
  tags: string[];
  thumbnailUrl: string | null;
};

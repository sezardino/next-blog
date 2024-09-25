export const BASE_POSTS_SELECT = {
  id: true,
  title: true,
  description: true,
  thumbnailUrl: true,
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

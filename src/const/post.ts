export const BASE_POSTS_SELECT = {
  id: true,
  title: true,
  description: true,
  thumbnail: { select: { publicPath: true } },
  tags: { select: { name: true } },
  author: {
    select: {
      firstName: true,
      lastName: true,
      email: true,
      avatar: { select: { publicPath: true } },
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

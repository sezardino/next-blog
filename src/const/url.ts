export const ProjectUrls = {
  // landing
  home: "/",
  about: "/about",
  roadMap: "/road-map",

  // auth
  login: "/auth/login",
  registration: "/auth/registration",
  registrationVerification: "/auth/registration-verification",
  forgotPassword: "/auth/forgot-password",

  // board
  dashboard: "/dashboard",

  // profile
  profile: "/profile",

  // posts
  posts: "/posts",
  post: (id: string) => `/posts/${id}`,

  // my posts
  myPosts: "/post",
  myPost: (id: string) => `/post/${id}`,
  editMyPost: (id: string) => `/post/${id}/edit`,
  newPost: "/post/new",

  // settings
  settings: "/settings",
  accountSettings: "/settings/account",
};

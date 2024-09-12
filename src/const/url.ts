export const ProjectUrls = {
  home: "/",

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
  myPosts: "/post",
  myPost: (id: string) => `/post/${id}`,
  newPost: "/post/new",

  // settings
  settings: "/settings",
  accountSettings: "/settings/account",
};

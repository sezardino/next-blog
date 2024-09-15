export const ProjectUrls = {
  // landing
  home: "/",
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
  myPosts: "/post",
  myPost: (id: string) => `/post/${id}`,
  editMyPost: (id: string) => `/post/${id}/edit`,
  newPost: "/post/new",

  // settings
  settings: "/settings",
  accountSettings: "/settings/account",
};

export const landingNavigationLinks = [
  { label: "Home", href: ProjectUrls.home },
  { label: "Road Map", href: ProjectUrls.roadMap },
];

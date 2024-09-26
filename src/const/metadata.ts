import { Metadata } from "next";

export const DEFAULT_METADATA: Metadata = {
  title: {
    template: "%s | Next-blog",
    default: "Website",
  },
  description: "The official Next-blog website.",
  openGraph: {
    title: "Next-blog",
    description: "The official Next-blog website.",
    // TODO: add right url
    url: "",
    siteName: "Next-blog",
    images: [{ url: "/og.jpg", width: 800, height: 600 }],
    locale: "en_US",
    type: "website",
  },
};

import { ApplicationLayout } from "@/components/layout/application-layout";
import { Metadata } from "next";
import { getDashboardMetadata } from "./actions/metadata";

export const generateMetadata = async (): Promise<Metadata> => {
  const user = await getDashboardMetadata();
  const description =
    "User dashboard where you can find your posts and statistics";

  if ("message" in user)
    return {
      title: {
        template: `%s | User Dashboard`,
        default: "Home",
      },
      description,
    };

  const name =
    user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.email;

  return {
    title: {
      template: `%s | ${name} Dashboard`,
      default: "Home",
    },
    description,
  };
};

export default ApplicationLayout;

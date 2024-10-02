import { LandingFooter } from "@/components/modules/layout/landing-footer";
import { LandingHeader } from "@/components/modules/layout/landing-header";
import { PropsWithChildren } from "react";
import { getCurrentUserData } from "../actions/current-user";

const LandingLayout = async ({ children }: PropsWithChildren) => {
  const user = await getCurrentUserData();

  return (
    <>
      <LandingHeader user={user} />
      {children}
      <LandingFooter isUserAuthenticated={!!user} />
    </>
  );
};

export default LandingLayout;

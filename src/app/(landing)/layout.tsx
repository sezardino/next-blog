import { LandingFooter } from "@/components/modules/layout/landing-footer";
import { LandingHeader } from "@/components/modules/layout/landing-header";
import { PropsWithChildren } from "react";
import { getCurrentUserData } from "../actions/current-user";

const LandingLayout = async ({ children }: PropsWithChildren) => {
  const userResponse = await getCurrentUserData();

  return (
    <>
      <LandingHeader
        user={userResponse && "avatarUrl" in userResponse ? userResponse : null}
      />
      {children}
      <LandingFooter
        isUserAuthenticated={!!userResponse && "avatarUrl" in userResponse}
      />
    </>
  );
};

export default LandingLayout;

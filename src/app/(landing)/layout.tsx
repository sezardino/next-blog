import { getCurrentUserData } from "@/actions";
import { LandingFooter } from "@/components/modules/layout/landing-footer";
import { LandingHeader } from "@/components/modules/layout/landing-header";
import { PropsWithChildren } from "react";

const LandingLayout = async ({ children }: PropsWithChildren) => {
  // TODO: hide in first mvp
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

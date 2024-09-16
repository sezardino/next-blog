import { getCurrentUserData } from "@/actions";
import { LandingFooter } from "@/components/layout/landing-footer";
import { LandingHeader } from "@/components/layout/landing-header";
import { PropsWithChildren } from "react";

const LandingLayout = async ({ children }: PropsWithChildren) => {
  // TODO: hide in first mvp
  const user = await getCurrentUserData();

  return (
    <>
      <LandingHeader user={user || undefined} />
      {children}
      <LandingFooter />
    </>
  );
};

export default LandingLayout;

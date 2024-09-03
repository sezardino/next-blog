import { getCurrentUserData } from "@/actions";
import { LandingHeader } from "@/components/layout/landing-header";
import { PropsWithChildren } from "react";

const LandingLayout = async ({ children }: PropsWithChildren) => {
  const user = await getCurrentUserData();

  return (
    <>
      <LandingHeader user={user || undefined} />
      {children}
    </>
  );
};

export default LandingLayout;

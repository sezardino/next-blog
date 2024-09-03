import { VerificationFormValues } from "@/components/form/verification";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";

export const useRegistrationVerification = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const verify = useCallback(
    async (values: VerificationFormValues) => {
      if (!isLoaded) return;

      const { code } = values;

      try {
        // Use the code the user provided to attempt verification
        const completeSignUp = await signUp.attemptEmailAddressVerification({
          code,
        });
        // If verification was completed, set the session to active
        // and redirect the user
        if (completeSignUp.status === "complete") {
          await setActive({ session: completeSignUp.createdSessionId });
          toast.success("You are successfully registered in app");
          router.push("/api/auth/new-user");
        } else {
          // If the status is not complete, check why. User may need to
          // complete further steps.
          console.error(JSON.stringify(completeSignUp, null, 2));
        }
      } catch (err: any) {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error("Error:", JSON.stringify(err, null, 2));
      }
    },
    [isLoaded, router, setActive, signUp]
  );

  return { verify };
};

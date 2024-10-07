import { VerificationFormValues } from "@/schemas/auth";
import { useSignUp } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { ClerkAPIError } from "@clerk/types";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";

export const useRegistrationVerification = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [errors, setErrors] = useState<ClerkAPIError[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const verify = useCallback(
    async (values: VerificationFormValues) => {
      if (!isLoaded) return;

      const { code } = values;

      try {
        setIsLoading(true);
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
        if (isClerkAPIResponseError(err)) setErrors(err.errors);
        console.error(JSON.stringify(err, null, 2));
      } finally {
        setIsLoading(false);
      }
    },
    [isLoaded, router, setActive, signUp]
  );

  return { errors, verify, isLoading };
};

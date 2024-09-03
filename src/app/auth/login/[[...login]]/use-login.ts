import { LoginFormValues } from "@/components/form/login";
import { ProjectUrls } from "@/const";
import { useSignIn } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { ClerkAPIError } from "@clerk/types";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";

export const useLogin = () => {
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();
  const [errors, setErrors] = useState<ClerkAPIError[]>();

  // // Handle the submission of the sign-in form
  const login = useCallback(
    async (values: LoginFormValues) => {
      if (!isLoaded) {
        return;
      }

      setErrors(undefined);
      const { email, password } = values;

      // Start the sign-in process using the email and password provided
      try {
        const signInAttempt = await signIn.create({
          identifier: email,
          password,
        });

        // If sign-in process is complete, set the created session as active
        // and redirect the user
        if (signInAttempt.status === "complete") {
          await setActive({ session: signInAttempt.createdSessionId });
          toast("You are logged successfully");
          router.push(ProjectUrls.home);
        } else {
          // If the status is not complete, check why. User may need to
          // complete further steps.
          console.error(JSON.stringify(signInAttempt, null, 2));
        }
      } catch (err: any) {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        if (isClerkAPIResponseError(err)) setErrors(err.errors);
        console.error(JSON.stringify(err, null, 2));
      }
    },
    [isLoaded, router, setActive, signIn]
  );

  return { errors, login };
};

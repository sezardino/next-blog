import { ProjectUrls } from "@/const";
import {
  PasswordResetFormValues,
  PasswordResetRequestFormValues,
} from "@/schemas/auth";
import { useSignIn } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { ClerkAPIError } from "@clerk/types";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";

export const useForgotPassword = () => {
  const [isResettingStep, setIsResettingStep] = useState(false);
  const [errors, setErrors] = useState<ClerkAPIError[]>([]);

  const router = useRouter();
  const { signIn, setActive } = useSignIn();

  // Send the password reset code to the user's email
  const resetPasswordRequest = useCallback(
    async (values: PasswordResetRequestFormValues) => {
      const { email } = values;

      await signIn
        ?.create({
          strategy: "reset_password_email_code",
          identifier: email,
        })
        .then((_) => {
          setIsResettingStep(true);
          setErrors([]);
          toast.success("Check email for verification code");
        })
        .catch((err) => {
          // See https://clerk.com/docs/custom-flows/error-handling
          // for more info on error handling
          if (isClerkAPIResponseError(err)) setErrors(err.errors);
          console.error(JSON.stringify(err, null, 2));
        });
    },
    [signIn]
  );

  // Reset the user's password.
  // Upon successful reset, the user will be
  // signed in and redirected to the home page
  const resetPassword = useCallback(
    async (values: PasswordResetFormValues) => {
      const { code, password } = values;

      await signIn
        ?.attemptFirstFactor({
          strategy: "reset_password_email_code",
          code,
          password,
        })
        .then((result) => {
          if (result.status === "complete") {
            // Set the active session to
            // the newly created session (user is now signed in)
            setActive({ session: result.createdSessionId });
            toast("Password successfully reset");
            router.push(ProjectUrls.home);
            setErrors([]);
          } else {
            console.log(result);
          }
        })
        .catch((err) => {
          // See https://clerk.com/docs/custom-flows/error-handling
          // for more info on error handling
          if (isClerkAPIResponseError(err)) setErrors(err.errors);
          console.error(JSON.stringify(err, null, 2));
        });
    },
    [router, setActive, signIn]
  );

  return { isResettingStep, resetPassword, resetPasswordRequest, errors };
};

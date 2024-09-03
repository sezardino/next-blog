import { PasswordResetFormValues } from "@/components/form/password-reset";
import { PasswordResetRequestFormValues } from "@/components/form/password-reset-request";
import { ProjectUrls } from "@/const";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { toast } from "sonner";

export const useForgotPassword = () => {
  const [isResettingStep, setIsResettingStep] = useState(false);
  const [error, setError] = useState("");

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
          setError("");
          toast.success("Check email for verification code");
        })
        .catch((err) => {
          console.error("error", err.errors[0].longMessage);
          setError(err.errors[0].longMessage);
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
          // Check if 2FA is required
          if (result.status === "needs_second_factor") {
            setError("2FA is required");
          } else if (result.status === "complete") {
            // Set the active session to
            // the newly created session (user is now signed in)
            setActive({ session: result.createdSessionId });
            toast("Password successfully reset");
            router.push(ProjectUrls.home);
            setError("");
          } else {
            console.log(result);
          }
        })
        .catch((err) => {
          console.error("error", err.errors[0].longMessage);
          setError(err.errors[0].longMessage);
        });
    },
    [router, setActive, signIn]
  );

  return { isResettingStep, resetPassword, resetPasswordRequest, error };
};

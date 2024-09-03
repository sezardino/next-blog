"use client";

import { PasswordResetForm } from "@/components/form/password-reset";
import { PasswordResetRequestForm } from "@/components/form/password-reset-request";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { useAuth, useSignIn } from "@clerk/nextjs";
import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useForgotPassword } from "./use-forgot-password";

const FORGOT_PASSWORD_FORM_ID = "forgot-password-form-id";

const ForgotPasswordPage: NextPage = () => {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { isLoaded } = useSignIn();

  const { error, isResettingStep, resetPassword, resetPasswordRequest } =
    useForgotPassword();

  if (!isLoaded) {
    return null;
  }
  // If the user is already signed in,
  // redirect them to the home page
  if (isSignedIn) {
    router.push("/");
  }

  return (
    <Card className="md:w-96">
      <CardHeader>
        <Typography level="h1" styling="h3">
          Forgot Password?
        </Typography>
      </CardHeader>
      <CardContent>
        {!isResettingStep && (
          <PasswordResetRequestForm
            id={FORGOT_PASSWORD_FORM_ID}
            onFormSubmit={resetPasswordRequest}
            error={error}
          />
        )}
        {isResettingStep && (
          <PasswordResetForm
            id={FORGOT_PASSWORD_FORM_ID}
            onFormSubmit={resetPassword}
            error={error}
          />
        )}
      </CardContent>

      <CardFooter className="grid grid-cols-1 gap-3 items-start">
        <Button form={FORGOT_PASSWORD_FORM_ID} type="submit" className="w-full">
          {!isResettingStep ? "Send password reset code" : "Reset"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ForgotPasswordPage;

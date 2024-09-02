"use client";

import {
  PasswordResetForm,
  PasswordResetFormValues,
} from "@/components/form/password-reset";
import {
  PasswordResetRequestForm,
  PasswordResetRequestFormValues,
} from "@/components/form/password-reset-request";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { ProjectUrls } from "@/const";
import { useAuth, useSignIn } from "@clerk/nextjs";
import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const FORGOT_PASSWORD_FORM_ID = "forgot-password-form-id";

const ForgotPasswordPage: NextPage = () => {
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  // If the user is already signed in,
  // redirect them to the home page
  if (isSignedIn) {
    router.push("/");
  }

  // Send the password reset code to the user's email
  async function resetPasswordRequest(values: PasswordResetRequestFormValues) {
    const { email } = values;

    await signIn
      ?.create({
        strategy: "reset_password_email_code",
        identifier: email,
      })
      .then((_) => {
        setSuccessfulCreation(true);
        setError("");
      })
      .catch((err) => {
        console.error("error", err.errors[0].longMessage);
        setError(err.errors[0].longMessage);
      });
  }

  // Reset the user's password.
  // Upon successful reset, the user will be
  // signed in and redirected to the home page
  async function resetPassword(values: PasswordResetFormValues) {
    const { code, password } = values;
    console.log(111);

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
  }

  return (
    <Card className="md:w-96">
      <CardHeader>
        <Typography level="h1" styling="h3">
          Forgot Password?
        </Typography>
      </CardHeader>
      <CardContent>
        {!successfulCreation && (
          <PasswordResetRequestForm
            id={FORGOT_PASSWORD_FORM_ID}
            onFormSubmit={resetPasswordRequest}
            error={error}
          />
        )}
        {successfulCreation && (
          <PasswordResetForm
            id={FORGOT_PASSWORD_FORM_ID}
            onFormSubmit={resetPassword}
            error={error}
          />
        )}
      </CardContent>

      <CardFooter className="grid grid-cols-1 gap-3 items-start">
        <Button form={FORGOT_PASSWORD_FORM_ID} type="submit" className="w-full">
          {!successfulCreation ? "Send password reset code" : "Reset"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ForgotPasswordPage;

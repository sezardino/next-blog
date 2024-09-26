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
import { ProjectUrls } from "@/const";
import { useAuth, useSignIn } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
import type { Metadata, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForgotPassword } from "./use-forgot-password";

const FORGOT_PASSWORD_FORM_ID = "forgot-password-form-id";

export const metadata: Metadata = { title: "Forgot password" };

export const ForgotPasswordPageWrapper: NextPage = () => {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { isLoaded } = useSignIn();

  const { errors, isResettingStep, resetPassword, resetPasswordRequest } =
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
      <CardHeader className="gap-4">
        <Typography level="h1" styling="h3">
          Forgot Password?
        </Typography>
        {isResettingStep && (
          <Typography styling="small">
            Check your email, for verification code
          </Typography>
        )}

        <Button asChild variant="link">
          <Link
            href={ProjectUrls.login}
            className="-order-1 !justify-start gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Login
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {!isResettingStep && (
          <PasswordResetRequestForm
            id={FORGOT_PASSWORD_FORM_ID}
            onFormSubmit={resetPasswordRequest}
            errors={errors}
          />
        )}
        {isResettingStep && (
          <PasswordResetForm
            id={FORGOT_PASSWORD_FORM_ID}
            onFormSubmit={resetPassword}
            errors={errors}
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

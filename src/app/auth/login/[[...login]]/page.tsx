"use client";

import { LoginForm, LoginFormValues } from "@/components/form/login";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { ProjectUrls } from "@/const";
import { useSignIn } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { ClerkAPIError } from "@clerk/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LOGIN_FORM_ID = "login-form";

const LoginPage = () => {
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();
  const [errors, setErrors] = useState<ClerkAPIError[]>();

  // // Handle the submission of the sign-in form
  const login = async (values: LoginFormValues) => {
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
  };

  // Display a form to capture the user's email and password
  return (
    <Card className="md:w-96">
      <CardHeader>
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Sign in to your account
        </h1>
      </CardHeader>
      <CardContent>
        <LoginForm id={LOGIN_FORM_ID} onFormSubmit={login} errors={errors} />
      </CardContent>

      <CardFooter className="grid grid-cols-1 gap-3 items-start">
        <Button form={LOGIN_FORM_ID} type="submit" className="w-full">
          Sign in
        </Button>
        <Button asChild variant={"link"}>
          <Link href={ProjectUrls.forgotPassword}>Forgot password?</Link>
        </Button>
        <Typography level="p" styling="small">
          Sign up Don’t have an account yet?{" "}
          <Button asChild variant={"link"}>
            <Link href={ProjectUrls.registration}>Sign up</Link>
          </Button>
        </Typography>
      </CardFooter>
    </Card>
  );
};

export default LoginPage;

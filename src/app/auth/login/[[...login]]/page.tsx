"use client";

import { LoginForm } from "@/components/form/login";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { ProjectUrls } from "@/const";
import Link from "next/link";
import { useLogin } from "./use-login";

const LOGIN_FORM_ID = "login-form";

const LoginPage = () => {
  const { errors, login } = useLogin();

  return (
    <Card className="md:w-96">
      <CardHeader>
        <Typography level="h1" styling="h3">
          Sign in to your account
        </Typography>
      </CardHeader>
      <CardContent>
        <LoginForm id={LOGIN_FORM_ID} onFormSubmit={login} errors={errors} />
      </CardContent>

      <CardFooter className="grid grid-cols-1 gap-3 items-start">
        <Button form={LOGIN_FORM_ID} type="submit" className="w-full">
          Login
        </Button>
        <Button asChild variant={"link"}>
          <Link href={ProjectUrls.forgotPassword}>Forgot password?</Link>
        </Button>
        <Typography level="p" styling="small">
          Don’t have an account yet?{" "}
          <Button asChild variant={"link"}>
            <Link href={ProjectUrls.registration}>Register</Link>
          </Button>
        </Typography>
      </CardFooter>
    </Card>
  );
};

export default LoginPage;

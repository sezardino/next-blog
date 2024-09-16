"use client";

import { RegistrationForm } from "@/components/form/registration";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { ProjectUrls } from "@/const";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRegistration } from "./use-registration";

const REGISTRATION_FORM_ID = "registration-form-id";

const RegistrationPage = () => {
  const { errors, registration, isLoading } = useRegistration();

  return (
    <Card className="md:w-96">
      <CardHeader>
        <Typography level="h1" styling="h3">
          Sign in to your account
        </Typography>
      </CardHeader>
      <CardContent>
        <RegistrationForm
          id={REGISTRATION_FORM_ID}
          onFormSubmit={registration}
          errors={errors}
        />
      </CardContent>

      <CardFooter className="grid grid-cols-1 gap-3 items-start">
        <Button
          form={REGISTRATION_FORM_ID}
          disabled={isLoading}
          type="submit"
          className="w-full"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Register
        </Button>

        <Typography level="p" styling="small">
          Already have an acccount?{" "}
          <Button asChild variant={"link"}>
            <Link href={ProjectUrls.login}>Login</Link>
          </Button>
        </Typography>
      </CardFooter>
    </Card>
  );
};

export default RegistrationPage;

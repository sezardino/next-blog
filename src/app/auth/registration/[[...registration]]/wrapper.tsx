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

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRegistration } from "./use-registration";

const REGISTRATION_FORM_ID = "registration-form-id";

export const RegistrationPageWrapper = () => {
  const { errors, registration, isLoading } = useRegistration();

  return (
    <Card className="md:w-96">
      <CardHeader className="gap-2">
        <Typography level="h1" styling="h3">
          Create new account
        </Typography>
        <Alert variant="default">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Notice:</AlertTitle>
          <AlertDescription>
            <Typography styling="xs" className="text-muted-foreground">
              Now you can only create account as Content creator
            </Typography>
          </AlertDescription>
        </Alert>
        <Button asChild variant="link">
          <Link
            href={ProjectUrls.home}
            className="-order-1 !justify-start gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="mt-2">
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

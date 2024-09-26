"use client";

import { VerificationForm } from "@/components/form/verification";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { ProjectUrls } from "@/const";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRegistrationVerification } from "./use-registration-verification";
import { Metadata } from "next";

const VERIFICATION_FORM_ID = "vERIFICATION-form-id";

export const metadata: Metadata = { title: "Verify account" };

const RegistrationVerificationPage = () => {
  const { errors, verify, isLoading } = useRegistrationVerification();

  return (
    <Card className="md:w-96">
      <CardHeader className="gap-4">
        <div className="flex flex-col">
          <Typography level="h1" styling="h3">
            Verification Code
          </Typography>
          <Typography level="p" styling="small">
            Check your email, for verification code
          </Typography>
        </div>
        <Button asChild variant="link">
          <Link
            href={ProjectUrls.registration}
            className="-order-1 !justify-start gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Registration
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <VerificationForm
          id={VERIFICATION_FORM_ID}
          onFormSubmit={verify}
          errors={errors}
        />
      </CardContent>

      <CardFooter className="grid grid-cols-1 gap-3 items-start">
        <Button
          form={VERIFICATION_FORM_ID}
          type="submit"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Verify my code
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RegistrationVerificationPage;

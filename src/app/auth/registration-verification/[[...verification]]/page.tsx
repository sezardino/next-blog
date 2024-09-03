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
import { useRegistrationVerification } from "./use-registration-verification";

const VERIFICATION_FORM_ID = "vERIFICATION-form-id";

const RegistrationVerificationPage = () => {
  const { verify } = useRegistrationVerification();

  return (
    <Card className="md:w-96">
      <CardHeader>
        <Typography level="h1" styling="h3">
          Verification Code
        </Typography>
      </CardHeader>
      <CardContent>
        <VerificationForm id={VERIFICATION_FORM_ID} onFormSubmit={verify} />
      </CardContent>

      <CardFooter className="grid grid-cols-1 gap-3 items-start">
        <Button form={VERIFICATION_FORM_ID} type="submit" className="w-full">
          Verify my code
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RegistrationVerificationPage;

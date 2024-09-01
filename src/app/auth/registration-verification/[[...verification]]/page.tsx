"use client";

import {
  RegistrationVerificationForm,
  VerifyRegistrationFormValues,
} from "@/components/form/registration-verification";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { ProjectUrls } from "@/const";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const VERIFICATION_FORM_ID = "vERIFICATION-form-id";

const RegistrationVerificationPage = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  // Handle the submission of the verification form
  const verifyRegistrationCode = async (
    values: VerifyRegistrationFormValues
  ) => {
    if (!isLoaded) return;

    const { code } = values;

    try {
      // Use the code the user provided to attempt verification
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push(ProjectUrls.home);
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error("Error:", JSON.stringify(err, null, 2));
    }
  };

  // Display the initial sign-up form to capture the email and password
  return (
    <Card className="md:w-96">
      <CardHeader>
        <Typography level="h1" styling="h3">
          Verification Code
        </Typography>
      </CardHeader>
      <CardContent>
        <RegistrationVerificationForm
          id={VERIFICATION_FORM_ID}
          onFormSubmit={verifyRegistrationCode}
        />
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

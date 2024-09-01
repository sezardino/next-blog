"use client";

import {
  RegistrationForm,
  RegistrationFormValues,
} from "@/components/form/registration";
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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const REGISTRATION_FORM_ID = "registration-form-id";

const RegistrationPage = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [registrationError, setRegistrationError] = useState("");
  const router = useRouter();

  // Handle submission of the sign-up form
  const handleSubmit = async (values: RegistrationFormValues) => {
    if (!isLoaded) return;

    const { email, password } = values;

    // Start the sign-up process using the email and password provided
    try {
      await signUp.create({
        emailAddress: email,
        password,
      });

      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      // Set 'verifying' true to display second form
      // and capture the OTP code
      router.push(ProjectUrls.registrationVerification);
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
      setRegistrationError(err.errors[0].message);
    }
  };

  // Display the initial sign-up form to capture the email and password
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
          onFormSubmit={handleSubmit}
          error={registrationError}
        />
      </CardContent>

      <CardFooter className="grid grid-cols-1 gap-3 items-start">
        <Button form={REGISTRATION_FORM_ID} type="submit" className="w-full">
          Sign in
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

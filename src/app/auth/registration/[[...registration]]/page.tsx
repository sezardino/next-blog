"use client";

import {
  RegistrationForm,
  RegistrationFormValues,
} from "@/components/form/registration";
import {
  RegistrationVerificationForm,
  VerifyRegistrationFormValues,
} from "@/components/form/registration-verification";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [registrationError, setRegistrationError] = useState("");
  const [verifying, setVerifying] = useState(false);
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
      setVerifying(true);
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
      setRegistrationError(err.errors[0].message);
    }
  };

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
        router.push("/");
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

  if (verifying) {
    return (
      <RegistrationVerificationForm onFormSubmit={verifyRegistrationCode} />
    );
  }

  // Display the initial sign-up form to capture the email and password
  return (
    <RegistrationForm onFormSubmit={handleSubmit} error={registrationError} />
  );
}

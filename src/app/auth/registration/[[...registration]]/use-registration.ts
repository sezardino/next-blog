import { ProjectUrls } from "@/const";
import { RegistrationFormValues } from "@/schemas/auth";
import { useSignUp } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { ClerkAPIError } from "@clerk/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useRegistration = () => {
  const { isLoaded, signUp } = useSignUp();
  const [errors, setErrors] = useState<ClerkAPIError[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Handle submission of the sign-up form
  const registration = async (values: RegistrationFormValues) => {
    if (!isLoaded) return;

    const { email, password } = values;

    // Start the sign-up process using the email and password provided
    try {
      setIsLoading(true);
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
      if (isClerkAPIResponseError(err)) setErrors(err.errors);
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  return { errors, registration, isLoading };
};

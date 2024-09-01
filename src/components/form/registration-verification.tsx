"use client";

import { cn } from "@/utils/styles";
import { ComponentPropsWithoutRef, FormEvent } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";

export type VerifyRegistrationFormValues = {
  code: string;
};

type VerifyRegistrationFormProps = ComponentPropsWithoutRef<"form"> & {
  onFormSubmit: (values: VerifyRegistrationFormValues) => void;
};

export const RegistrationVerificationForm = (
  props: VerifyRegistrationFormProps
) => {
  const { onFormSubmit, className, ...rest } = props;

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      code: { value: string };
    };

    const code = target.code.value;

    onFormSubmit({ code });
  };

  return (
    <form {...rest} className={cn(className)} onSubmit={submitHandler}>
      <InputOTP name="code" maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </form>
  );
};

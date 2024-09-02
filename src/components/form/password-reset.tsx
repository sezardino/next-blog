"use client";

import { cn } from "@/utils/styles";
import { ComponentPropsWithoutRef, FormEvent } from "react";
import { Input } from "../ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";
import { Label } from "../ui/label";
import { Typography } from "../ui/typography";

export type PasswordResetFormValues = {
  password: string;
  code: string;
};

type PasswordResetFormProps = ComponentPropsWithoutRef<"form"> & {
  onFormSubmit: (values: PasswordResetFormValues) => void;
  error: string;
};

export const PasswordResetForm = (props: PasswordResetFormProps) => {
  const { onFormSubmit, error, className, ...rest } = props;

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      password: { value: string };
      code: { value: string };
    };

    const password = target.password.value;
    const code = target.code.value;

    onFormSubmit({ password, code });
  };

  return (
    <form
      {...rest}
      className={cn("flex flex-col gap-3", className)}
      onSubmit={submitHandler}
    >
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" placeholder="Password" />
      </div>

      <Label htmlFor="code">
        Enter the password reset code that was sent to your email
      </Label>
      <InputOTP id="code" name="code" maxLength={6}>
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

      {error && (
        <Typography
          level="span"
          styling="small"
          className="mt-2 text-center text-red-400"
        >
          {error}
        </Typography>
      )}
    </form>
  );
};

"use client";

import { cn } from "@/utils/styles";
import { ComponentPropsWithoutRef, FormEvent } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Typography } from "../ui/typography";

export type PasswordResetRequestFormValues = {
  email: string;
};

type PasswordResetRequestFormProps = ComponentPropsWithoutRef<"form"> & {
  onFormSubmit: (values: PasswordResetRequestFormValues) => void;
  error: string;
};

export const PasswordResetRequestForm = (
  props: PasswordResetRequestFormProps
) => {
  const { onFormSubmit, error, className, ...rest } = props;

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
    };

    const email = target.email.value;

    onFormSubmit({ email });
  };

  return (
    <form
      {...rest}
      className={cn("flex flex-col gap-3", className)}
      onSubmit={submitHandler}
    >
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Please provide your email address</Label>
        <Input type="email" id="email" placeholder="Email" />
      </div>

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

"use client";

import { VerificationFormSchema, VerificationFormValues } from "@/schemas/auth";
import { cn } from "@/utils/styles";
import { ClerkAPIError } from "@clerk/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ComponentPropsWithoutRef } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";
import { Typography } from "../ui/typography";

type VerificationFormProps = ComponentPropsWithoutRef<"form"> & {
  onFormSubmit: (values: VerificationFormValues) => void;
  errors?: ClerkAPIError[];
};

export const VerificationForm = (props: VerificationFormProps) => {
  const { onFormSubmit, errors, className, ...rest } = props;

  const form = useForm<VerificationFormValues>({
    resolver: zodResolver(VerificationFormSchema),
  });

  const onSubmit = (data: VerificationFormValues) => {
    onFormSubmit(data);
  };

  return (
    <Form {...form}>
      <form
        {...rest}
        className={cn(className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputOTP {...field} maxLength={6}>
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
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {errors && (
          <ul>
            {errors.map((el, index) => (
              <li key={index}>
                <Typography level="span" className="text-red-400">
                  {el.longMessage}
                </Typography>
              </li>
            ))}
          </ul>
        )}
      </form>
    </Form>
  );
};

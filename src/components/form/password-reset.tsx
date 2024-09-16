"use client";

import {
  PasswordResetFormSchema,
  PasswordResetFormValues,
} from "@/schemas/auth";
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
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";
import { Typography } from "../ui/typography";

type PasswordResetFormProps = ComponentPropsWithoutRef<"form"> & {
  onFormSubmit: (values: PasswordResetFormValues) => void;
  errors?: ClerkAPIError[];
};

export const PasswordResetForm = (props: PasswordResetFormProps) => {
  const { onFormSubmit, errors, className, ...rest } = props;

  const form = useForm<PasswordResetFormValues>({
    resolver: zodResolver(PasswordResetFormSchema),
  });

  const onSubmit = (data: PasswordResetFormValues) => {
    onFormSubmit(data);
  };

  return (
    <Form {...form}>
      <form
        {...rest}
        className={cn("flex flex-col gap-4", className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" placeholder="Password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

"use client";

import {
  PasswordResetRequestFormSchema,
  PasswordResetRequestFormValues,
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
import { Typography } from "../ui/typography";

type PasswordResetRequestFormProps = ComponentPropsWithoutRef<"form"> & {
  onFormSubmit: (values: PasswordResetRequestFormValues) => void;
  errors: ClerkAPIError[];
};

export const PasswordResetRequestForm = (
  props: PasswordResetRequestFormProps
) => {
  const { onFormSubmit, errors, className, ...rest } = props;

  const form = useForm<PasswordResetRequestFormValues>({
    resolver: zodResolver(PasswordResetRequestFormSchema),
  });

  const onSubmit = (data: PasswordResetRequestFormValues) => {
    onFormSubmit(data);
  };

  return (
    <Form {...form}>
      <form
        {...rest}
        className={cn("flex flex-col gap-3", className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Please provide your email address</FormLabel>
              <FormControl>
                <Input {...field} type="email" placeholder="Email" />
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

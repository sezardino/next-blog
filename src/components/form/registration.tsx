"use client";

import { RegistrationFormSchema, RegistrationFormValues } from "@/schemas/auth";
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

type RegistrationFormProps = ComponentPropsWithoutRef<"form"> & {
  onFormSubmit: (values: RegistrationFormValues) => void;
  errors?: ClerkAPIError[];
};

export const RegistrationForm = (props: RegistrationFormProps) => {
  const { errors, onFormSubmit, className, ...rest } = props;

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(RegistrationFormSchema),
  });

  const onSubmit = (data: RegistrationFormValues) => {
    onFormSubmit(data);
  };

  return (
    <Form {...form}>
      <form
        {...rest}
        className={cn("space-y-4 md:space-y-6", className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" placeholder="Email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
          name="confirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repeat password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="Repeat password"
                />
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

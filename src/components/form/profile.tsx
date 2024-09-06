"use client";

import { cn } from "@/utils/styles";
import { Label } from "@radix-ui/react-label";
import { ComponentPropsWithoutRef, FormEvent } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export type ProfileFormValues = {
  firstName: string;
  lastName: string;
  bio: string;
};

type ProfileFormProps = ComponentPropsWithoutRef<"form"> & {
  onFormSubmit: (values: ProfileFormValues) => void;
  initialValues: Partial<ProfileFormValues>;
};

export const ProfileForm = (props: ProfileFormProps) => {
  const { initialValues, onFormSubmit, className, ...rest } = props;

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      firstName: { value: string };
      lastName: { value: string };
      bio: { value: string };
    };
    const firstName = target.firstName.value;
    const lastName = target.lastName.value;
    const bio = target.bio.value;
    onFormSubmit({ firstName, lastName, bio });
  };

  return (
    <form
      {...rest}
      className={cn("grid grid-cols-1 gap-4 md:gap-6", className)}
      onSubmit={submitHandler}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">FirstName</Label>
          <Input
            defaultValue={initialValues.firstName}
            type="text"
            id="firstName"
            placeholder="FirstName"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="lastName">LastName</Label>
          <Input
            defaultValue={initialValues.lastName}
            type="text"
            id="lastName"
            placeholder="LastName"
          />
        </div>
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" defaultValue={initialValues.bio} placeholder="Bio" />
      </div>

      <Button type="submit" className="ml-auto">
        Save
      </Button>
    </form>
  );
};

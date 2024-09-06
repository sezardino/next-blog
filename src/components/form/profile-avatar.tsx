"use client";

import { cn } from "@/utils/styles";
import { ComponentPropsWithoutRef, FormEvent } from "react";
import { Button } from "../ui/button";

export type ProfileAvatarFormValues = {};

type ProfileAvatarFormProps = ComponentPropsWithoutRef<"form"> & {
  onFormSubmit: (values: ProfileAvatarFormValues) => void;
  initialValues: Partial<ProfileAvatarFormValues>;
};

export const ProfileAvatarForm = (props: ProfileAvatarFormProps) => {
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
      className={cn(
        "flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0",
        className
      )}
      onSubmit={submitHandler}
    >
      <img
        className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
        alt="Bordered avatar"
      />
      <div className="flex flex-col space-y-5 sm:ml-8">
        <div>
          <Button asChild size={"lg"}>
            <label className="cursor-pointer">
              Select Image
              <input type="file" className="sr-only" />
            </label>
          </Button>
          <Button size={"lg"} variant={"destructive"}>
            Delete image
          </Button>
        </div>
      </div>
    </form>
  );
};

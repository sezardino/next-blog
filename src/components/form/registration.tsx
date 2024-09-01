import { cn } from "@/utils/styles";
import { Label } from "@radix-ui/react-label";
import { ComponentPropsWithoutRef, FormEvent } from "react";
import { Input } from "../ui/input";

export type RegistrationFormValues = {
  email: string;
  password: string;
};

type RegistrationFormProps = ComponentPropsWithoutRef<"form"> & {
  onFormSubmit: (values: RegistrationFormValues) => void;
  error: string;
};

export const RegistrationForm = (props: RegistrationFormProps) => {
  const { error, onFormSubmit, className, ...rest } = props;

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    const email = target.email.value;
    const password = target.password.value;

    onFormSubmit({ email, password });
  };

  return (
    <form
      {...rest}
      className={cn("space-y-4 md:space-y-6", className)}
      onSubmit={submitHandler}
    >
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="Email" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" placeholder="Password" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="repeat-password">Repeat password</Label>
        <Input
          type="password"
          id="repeat-password"
          placeholder="Repeat password"
        />
      </div>

      {error && (
        <h2 className="text-red mb-8">
          <p>{error}</p>
        </h2>
      )}
    </form>
  );
};

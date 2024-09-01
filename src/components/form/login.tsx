import { cn } from "@/utils/styles";
import { ClerkAPIError } from "@clerk/types";
import { Label } from "@radix-ui/react-label";
import { ComponentPropsWithoutRef, FormEvent } from "react";
import { Input } from "../ui/input";
import { Typography } from "../ui/typography";

export type LoginFormValues = {
  email: string;
  password: string;
};

type LoginFormProps = ComponentPropsWithoutRef<"form"> & {
  onFormSubmit: (values: LoginFormValues) => void;
  errors?: ClerkAPIError[];
};

export const LoginForm = (props: LoginFormProps) => {
  const { errors, onFormSubmit, className, ...rest } = props;

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;
    onFormSubmit({ email, password: password });
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
  );
};

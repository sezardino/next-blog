"use client";

import { cn } from "@/utils/styles";
import {
  Children,
  cloneElement,
  ComponentPropsWithoutRef,
  ReactElement,
  useId,
} from "react";
import { Label } from "../ui/label";
import { Typography } from "../ui/typography";

type FormFieldProps = ComponentPropsWithoutRef<"div"> & {
  label?: string;
  description?: string;
  error?: string;
  children: ReactElement;
};

export const FormField = (props: FormFieldProps) => {
  const { description, label, error, children, className, ...rest } = props;
  const id = useId();
  const errorId = `${id}-error`;
  const descriptionId = `${id}-description`;

  const childElement = Children.only(children);

  return (
    <div {...rest} className={cn("grid w-full items-center gap-2", className)}>
      {label && <Label htmlFor={id}>{label}</Label>}

      {cloneElement(childElement, {
        id,
        "aria-describedby": description ? descriptionId : undefined,
        "aria-invalid": !!error,
      })}

      {(error || description) && (
        <div className="flex flex-col gap-1">
          {description && (
            <Typography
              styling="small"
              id={descriptionId}
              className="text-white/80"
            >
              {description}
            </Typography>
          )}
          {error && (
            <Typography id={errorId} styling="xs" className="text-destructive">
              {error}
            </Typography>
          )}
        </div>
      )}
    </div>
  );
};

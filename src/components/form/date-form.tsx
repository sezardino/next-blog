"use client";

import { DEFAULT_DATE_FORMAT } from "@/const/date";
import { cn } from "@/utils/styles";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { CalendarIcon } from "lucide-react";
import { ComponentPropsWithoutRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const DateFormSchema = z.object({
  date: z.date({ required_error: "Date is required" }),
});

export type DateFormValues = z.infer<typeof DateFormSchema>;

type DateFormProps = ComponentPropsWithoutRef<"form"> & {
  onFormSubmit: (values: DateFormValues) => void;
  schema?: z.ZodObject<any>;
  initialDate?: Date;
  label: string;
  isLabelSR?: boolean;
  description?: string;
};

export const DateForm = (props: DateFormProps) => {
  const {
    schema = DateFormSchema,
    onFormSubmit,
    initialDate,
    label,
    isLabelSR,
    description,
    className,
    ...rest
  } = props;

  const form = useForm<DateFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { date: initialDate ?? new Date() },
  });

  const onSubmit = (data: DateFormValues) => {
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
          name="date"
          render={({ field }) => (
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className={cn(isLabelSR && "sr-only")}>
                    {label}
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            dayjs(field.value).format(DEFAULT_DATE_FORMAT)
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value || undefined}
                        onSelect={field.onChange}
                        disabled={(date) => {
                          const { success } = schema.safeParse({ date });

                          return !success;
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {description && (
                    <FormDescription>{description}</FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        />
      </form>
    </Form>
  );
};

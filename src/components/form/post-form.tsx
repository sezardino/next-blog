"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { ComponentPropsWithoutRef, useState } from "react";

import { PostFormSchema, PostFormValues } from "@/schemas/post-form";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { InputTag } from "../ui/input-tag";
import { Label } from "../ui/label";
import { PostEditor } from "../ui/post-editor";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";

type PostFormProps = ComponentPropsWithoutRef<"form"> & {
  withPublicationDate?: boolean;
  initialValues?: Partial<PostFormValues>;
  onFormSubmit: (values: PostFormValues) => void;
};

export const PostForm = (props: PostFormProps) => {
  const {
    withPublicationDate = false,
    initialValues,
    onFormSubmit,
    className,
    ...rest
  } = props;

  const [isSelectPublicationVisible, setIsSelectPublicationVisible] =
    useState(false);

  const form = useForm<PostFormValues>({
    resolver: zodResolver(PostFormSchema),
    defaultValues: {
      body: initialValues?.body || "",
      description: initialValues?.description || "",
      tags: initialValues?.tags || [],
      title: initialValues?.title || "",
    },
  });

  const onSubmit = (data: PostFormValues) => {
    onFormSubmit(data);
  };

  const changePublicationVisibility = (value: boolean) => {
    if (value) form.setValue("publishedAt", new Date());
    else form.setValue("publishedAt", new Date());

    setIsSelectPublicationVisible(value);
  };

  return (
    <Form {...form}>
      <form
        {...rest}
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-8"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="How to ..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="In this article we will tal about ..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Needed for seo and description in post card.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <InputTag
                  {...field}
                  placeholder="programming, people"
                  value={field.value}
                  onChange={(value) => form.setValue("tags", value)}
                />
              </FormControl>
              <FormDescription>Press Enter to save tag</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Body</FormLabel>
              <FormControl>
                <PostEditor {...field} placeholder="Type something nice ..." />
              </FormControl>
              <FormDescription>This is body of the post</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Label className="flex items-center gap-2 cursor-pointer">
          Publish?
          <Switch
            checked={isSelectPublicationVisible}
            onCheckedChange={changePublicationVisibility}
          />
        </Label>

        {/* {isSelectPublicationVisible && <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        dayjs(field.value)
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
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />} */}

        <Button type="submit" className="justify-self-end">
          Save
        </Button>
      </form>
    </Form>
  );
};

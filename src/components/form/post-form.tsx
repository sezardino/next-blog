"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { ComponentPropsWithoutRef, useState } from "react";

import { DEFAULT_DATE_FORMAT } from "@/const/date";
import { PostFormSchema, PostFormValues } from "@/schemas/post-form";
import { cn } from "@/utils/styles";

import dayjs from "dayjs";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
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
import { Input } from "../ui/input";
import { InputTag } from "../ui/input-tag";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";

import { normalizeTags } from "@/utils/post";
import dynamic from "next/dynamic";
import { Skeleton } from "../ui/skeleton";

const PostEditor = dynamic(() => import("../ui/post-editor"), {
  ssr: false,
  loading: () => <Skeleton className="h-96 w-full" />,
});

type PostFormProps = ComponentPropsWithoutRef<"form"> & {
  withPublicationDate?: boolean;
  initialValues?: Partial<PostFormValues>;
  onFormSubmit: (values: PostFormValues) => void;
  isDateEditable?: boolean;
};

export const PostForm = (props: PostFormProps) => {
  const {
    withPublicationDate = false,
    isDateEditable = false,
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
      publicationDate: initialValues?.publicationDate,
    },
  });

  const onSubmit = (data: PostFormValues) => {
    onFormSubmit(data);
  };

  const changePublicationVisibility = (value: boolean) => {
    if (!isDateEditable) return;
    if (value) form.setValue("publicationDate", new Date());
    else form.setValue("publicationDate", new Date());

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
                  onChange={(value) =>
                    form.setValue("tags", normalizeTags(value))
                  }
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
              <FormDescription>
                This is body of the post, select text to modify styles
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {isDateEditable && (
          <>
            <FormItem>
              <div className="flex items-center gap-3">
                <FormLabel>
                  Already know when you wont publish this quiz?
                </FormLabel>
                <FormControl>
                  <Switch
                    checked={isSelectPublicationVisible}
                    onCheckedChange={changePublicationVisibility}
                  />
                </FormControl>
              </div>
              <FormDescription>
                If selected, all fields should be filled.
              </FormDescription>
            </FormItem>

            {isSelectPublicationVisible && (
              <FormField
                control={form.control}
                name="publicationDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Publication Date</FormLabel>
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
                          disabled={(date) =>
                            dayjs(date).isBefore(
                              dayjs(new Date()).add(-1, "day")
                            )
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Date when this post should be published (you can change it
                      at any time)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </>
        )}

        <Button type="submit" className="justify-self-end">
          Save
        </Button>
      </form>
    </Form>
  );
};

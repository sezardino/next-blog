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
import { Textarea } from "../ui/textarea";

import { normalizeTags } from "@/utils/post";
import { cn } from "@/utils/styles";
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
  onCancelClick?: () => void;
  isDateEditable?: boolean;
};

export const PostForm = (props: PostFormProps) => {
  const {
    withPublicationDate = false,
    isDateEditable = false,
    initialValues,
    onFormSubmit,
    onCancelClick,
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
      // publicationDate: initialValues?.publicationDate,
    },
  });

  const onSubmit = (data: PostFormValues) => {
    onFormSubmit(data);
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
                  onChange={(value) => field.onChange(normalizeTags(value))}
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

        <footer className="flex items-center justify-between">
          {onCancelClick && (
            <Button type="button" variant={"outline"} onClick={onCancelClick}>
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            disabled={!form.formState.isDirty}
            className={cn(!onCancelClick && "ml-auto")}
          >
            Save
          </Button>
        </footer>
      </form>
    </Form>
  );
};

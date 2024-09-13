"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { ComponentPropsWithoutRef } from "react";

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
import { PostEditor } from "../ui/post-editor";
import { Textarea } from "../ui/textarea";

type PostFormProps = ComponentPropsWithoutRef<"form"> & {
  initialValues?: Partial<PostFormValues>;
  onFormSubmit: (values: PostFormValues) => void;
};

export const PostForm = (props: PostFormProps) => {
  const { initialValues, onFormSubmit, className, ...rest } = props;

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

  return (
    <Form {...form}>
      <form
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

        <Button type="submit" className="justify-self-end">
          Save
        </Button>
      </form>
    </Form>
  );
};

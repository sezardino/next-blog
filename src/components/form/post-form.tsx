"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { ComponentPropsWithoutRef } from "react";
import { z } from "zod";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { PostEditor } from "../base/post-editor";
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

const PostFormSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(8, "Title is too short")
    .max(64, "Title is too long"),
  description: z
    .string({ required_error: "Description is required" })
    .min(8, "Title is too short")
    .max(100, "Description should be maximum 100 characters"),
  // thumbnail: z.any(),
  tags: z.array(z.string()).min(1, "Tags is required field"),
  body: z.string({ required_error: "Body is required" }),
});

type PostFormValues = z.infer<typeof PostFormSchema>;

type PostFormProps = ComponentPropsWithoutRef<"form"> & {
  initialValues?: Partial<PostFormValues>;
  onFormSubmit: (values: PostFormValues) => void;
};

export const PostForm = (props: PostFormProps) => {
  const { initialValues, onFormSubmit, className, ...rest } = props;

  const form = useForm<PostFormValues>({
    resolver: zodResolver(PostFormSchema),
    defaultValues: { tags: [] },
  });

  function onSubmit(data: PostFormValues) {
    toast.success(JSON.stringify(data));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
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
                <Textarea placeholder="shadcn" {...field} />
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
                  placeholder="Enter a tags"
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
          name="title"
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

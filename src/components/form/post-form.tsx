"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { ComponentPropsWithoutRef, useRef, useState } from "react";

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

import {
  ACCEPTED_IMAGE_TYPES_POST_THUMBNAIL,
  PostFormSchema,
  PostFormValues,
} from "@/schemas/post";
import { normalizeTags } from "@/utils/post";
import { cn } from "@/utils/styles";
import { CloudUpload, Trash } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Typography } from "../ui/typography";

const PostEditor = dynamic(() => import("../ui/post-editor"), {
  ssr: false,
  loading: () => <Skeleton className="h-96 w-full" />,
});

type PostFormProps = ComponentPropsWithoutRef<"form"> & {
  withPublicationDate?: boolean;
  initialValues?: Omit<Partial<PostFormValues>, "thumbnail"> & {
    thumbnail: string | null;
  };
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
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
    initialValues?.thumbnail || null
  );

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

  const handleThumbnailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setThumbnailPreview(URL.createObjectURL(file));
      form.setValue("thumbnail", file, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    }
  };

  const handleDeleteThumbnail = () => {
    // if (initialValues?.thumbnail) return onTryToDeleteImage();

    setThumbnailPreview(null);
    form.setValue("thumbnail", undefined, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });

    if (inputRef.current) {
      inputRef.current.value = "";
    }
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

        <FormItem>
          <FormLabel>Thumbnail</FormLabel>
          {!thumbnailPreview && (
            <Card
              asChild
              className="flex items-center justify-center w-full hover:bg-muted cursor-pointer"
            >
              <label className="flex flex-col items-center justify-center pt-5 pb-6 gap-1">
                <CloudUpload className="text-muted-foreground w-8 h-8" />
                <Typography
                  styling="small"
                  weight="medium"
                  className="text-muted-foreground"
                >
                  Click to upload
                </Typography>
                <Typography styling="xs" className="text-muted-foreground">
                  JPEG, PNG or WEBP (We recommend use images with aspect-ratio
                  16:9)
                </Typography>
                <FormControl>
                  <input
                    ref={inputRef}
                    type="file"
                    accept={ACCEPTED_IMAGE_TYPES_POST_THUMBNAIL.join(",")}
                    className="sr-only"
                    onChange={handleThumbnailChange}
                  />
                </FormControl>
              </label>
            </Card>
          )}

          {thumbnailPreview && (
            <div className="relative">
              <Image
                src={thumbnailPreview}
                alt="selected post image"
                width={800}
                height={400}
                className="w-full aspect-video rounded-lg"
              />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size={"icon"}
                    color="destructive"
                    className="absolute bottom-0 right-1/2 translate-x-1/2 -translate-y-1/2"
                    onClick={handleDeleteThumbnail}
                  >
                    <Trash />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Delete thumbnail</TooltipContent>
              </Tooltip>
            </div>
          )}
        </FormItem>

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

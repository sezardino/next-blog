"use client";

import { forwardRef, ForwardRefRenderFunction } from "react";
import ReactQuill, { ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.bubble.css";

const toolbarOptions = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ size: ["small", false, "large", "huge"] }],
  [{ align: [] }],
  ["bold", "italic", "underline", "strike"],
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ indent: "-1" }, { indent: "+1" }],
  ["blockquote", "code-block"],
  [
    "link",
    // "image"  TODO: handle images
  ],

  ["clean"],
];

type Props = Omit<ReactQuillProps, "theme" | "modules">;

const PostEditorComponent: ForwardRefRenderFunction<ReactQuill, Props> = (
  props,
  ref
) => {
  return (
    <ReactQuill
      {...props}
      ref={ref}
      theme="bubble"
      modules={{ toolbar: toolbarOptions }}
      className="border-input border rounded-lg min-h-96 grid grid-cols-1 grid-rows-1"
    />
  );
};

export const PostEditor = forwardRef(PostEditorComponent);

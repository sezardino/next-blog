"use client";

import { Button } from "@/components/ui/button";
import { DataTable, DataTableProps } from "@/components/ui/data-table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ProjectUrls } from "@/const";
import { DEFAULT_DATE_FORMAT } from "@/const/date";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import {
  Check,
  Eye,
  Ghost,
  ThumbsDown,
  ThumbsUp,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { getMyPostsAction } from "./actions/get-posts";

type MyPostsTableType = Exclude<
  Awaited<ReturnType<typeof getMyPostsAction>>["data"],
  undefined
>[number];

type MyPostsTableProps = Omit<
  DataTableProps<MyPostsTableType, MyPostsTableType>,
  "columns"
>;

export const MyPostsTable = (props: MyPostsTableProps) => {
  const columns: ColumnDef<MyPostsTableType>[] = [
    { accessorKey: "title", header: "Post title" },
    {
      accessorKey: "publicationDate",
      header: "Publication",
      cell: (cell) =>
        !cell.row.original.publicationDate ||
        dayjs(cell.row.original.publicationDate).isAfter(new Date()) ? (
          <X className="w-5 h-5 mx-auto" />
        ) : (
          <Tooltip>
            <TooltipTrigger className="mx-auto flex">
              <Check className="w-5 h-5" />
            </TooltipTrigger>
            <TooltipContent>
              {dayjs(cell.row.original.publicationDate).format(
                DEFAULT_DATE_FORMAT
              )}
            </TooltipContent>
          </Tooltip>
        ),
    },
    {
      id: "likes",
      header: "Post likes",
      cell: (cell) => (
        <ul className="flex items-center gap-2">
          <li className="pr-2 border-r">
            <Tooltip>
              <TooltipTrigger className="flex items-center gap-1">
                <ThumbsUp className="w-5 h-5" />
                {cell.row.original.likes}
              </TooltipTrigger>
              <TooltipContent>Likes</TooltipContent>
            </Tooltip>
          </li>
          <li>
            <Tooltip>
              <TooltipTrigger className="flex items-center gap-1">
                <ThumbsDown className="w-5 h-5" />
                {cell.row.original.dislikes}
              </TooltipTrigger>
              <TooltipContent>Dislikes</TooltipContent>
            </Tooltip>
          </li>
        </ul>
      ),
    },

    {
      id: "views",
      header: "Views count",
      cell: (cell) => (
        <ul className="flex items-center gap-2">
          <li className="pr-2 border-r">
            <Tooltip>
              <TooltipTrigger className="flex items-center gap-1">
                <Users className="w-5 h-5" />
                {cell.row.original.views.total}
              </TooltipTrigger>
              <TooltipContent>Total views</TooltipContent>
            </Tooltip>
          </li>
          <li className="pr-2 border-r">
            <Tooltip>
              <TooltipTrigger className="flex items-center gap-1">
                <Ghost className="w-5 h-5" />
                {cell.row.original.views.anonymous}
              </TooltipTrigger>
              <TooltipContent>Not authorized users</TooltipContent>
            </Tooltip>
          </li>
          <li>
            <Tooltip>
              <TooltipTrigger className="flex items-center gap-1">
                <UserCheck className="w-5 h-5" />
                {cell.row.original.views.authorized}
              </TooltipTrigger>
              <TooltipContent>Authorized users</TooltipContent>
            </Tooltip>
          </li>
        </ul>
      ),
    },
    {
      accessorKey: "comments",
      header: "Comments count",
      cell: (cell) => (
        <span className="block text-center">{cell.row.original.comments}</span>
      ),
    },
    {
      accessorKey: "id",
      header: "",
      cell: (cell) => (
        <ul className="flex items-center gap-2">
          <li>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" asChild>
                  <Link href={ProjectUrls.myPost(cell.row.original.id)}>
                    <Eye className="w-5 h-5" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>See post</TooltipContent>
            </Tooltip>
          </li>
        </ul>
      ),
    },
  ];

  return <DataTable {...props} columns={columns} />;
};

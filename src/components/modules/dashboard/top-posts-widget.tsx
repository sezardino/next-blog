"use client";

import { getMyTopPosts } from "@/app/(app)/dashboard/actions/top-posts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DataTable, DataTableProps } from "@/components/ui/data-table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Typography } from "@/components/ui/typography";
import { ColumnDef } from "@tanstack/react-table";
import { Ghost, ThumbsDown, ThumbsUp, UserCheck, Users } from "lucide-react";

type MyTopPostsWidgetType = Exclude<
  Awaited<ReturnType<typeof getMyTopPosts>>["data"],
  undefined
>[number];

type OmittedProps = Omit<
  DataTableProps<MyTopPostsWidgetType, MyTopPostsWidgetType>,
  "columns"
>;

export type MyTopPostsWidgetProps = OmittedProps;

export const MyTopPostsWidget = (props: MyTopPostsWidgetProps) => {
  const { ...rest } = props;

  const columns: ColumnDef<MyTopPostsWidgetType>[] = [
    {
      accessorKey: "title",
      header: () => <Typography styling="xs">Title</Typography>,
      cell: (cell) => (
        <Typography styling="xs">{cell.row.original.title}</Typography>
      ),
    },
    {
      id: "likes",
      header: () => <Typography styling="xs">Likes</Typography>,
      cell: (cell) => (
        <ul className="flex items-center gap-2">
          <li className="pr-2 border-r">
            <Tooltip>
              <TooltipTrigger className="flex items-center gap-1">
                <ThumbsUp className="w-3.5 h-3.5" />
                <Typography level="span" styling="xs">
                  {cell.row.original.reactions.likes}
                </Typography>
              </TooltipTrigger>
              <TooltipContent>Likes</TooltipContent>
            </Tooltip>
          </li>
          <li>
            <Tooltip>
              <TooltipTrigger className="flex items-center gap-1">
                <ThumbsDown className="w-3.5 h-3.5" />
                <Typography level="span" styling="xs">
                  {cell.row.original.reactions.dislikes}
                </Typography>
              </TooltipTrigger>
              <TooltipContent>Dislikes</TooltipContent>
            </Tooltip>
          </li>
        </ul>
      ),
    },
    {
      id: "views",
      header: () => <Typography styling="xs">Views</Typography>,
      cell: (cell) => (
        <ul className="flex items-center gap-2">
          <li className="pr-2 border-r">
            <Tooltip>
              <TooltipTrigger className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                <Typography level="span" styling="xs">
                  {cell.row.original.views.total}
                </Typography>
              </TooltipTrigger>
              <TooltipContent>Total views</TooltipContent>
            </Tooltip>
          </li>
          <li className="pr-2 border-r">
            <Tooltip>
              <TooltipTrigger className="flex items-center gap-1">
                <Ghost className="w-3.5 h-3.5" />
                <Typography level="span" styling="xs">
                  {cell.row.original.views.anonymous}
                </Typography>
              </TooltipTrigger>
              <TooltipContent>Not authorized users</TooltipContent>
            </Tooltip>
          </li>
          <li>
            <Tooltip>
              <TooltipTrigger className="flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5" />
                <Typography level="span" styling="xs">
                  {cell.row.original.views.authorized}
                </Typography>
              </TooltipTrigger>
              <TooltipContent>Authorized users</TooltipContent>
            </Tooltip>
          </li>
        </ul>
      ),
    },
    {
      accessorKey: "comments",
      header: () => <Typography styling="xs">Comments</Typography>,
      cell: (cell) => (
        <Typography level="span" styling="xs" className="block text-center">
          {cell.row.original.comments}
        </Typography>
      ),
    },
  ];

  return (
    <Card {...rest}>
      <CardHeader>Top posts</CardHeader>
      <CardContent>
        <DataTable {...rest} columns={columns} />
      </CardContent>
    </Card>
  );
};

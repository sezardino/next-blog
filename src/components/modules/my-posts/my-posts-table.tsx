"use client";

import { getMyPostsAction } from "@/app/(app)/post/actions/get-my-posts";
import { MyPostsSearchParams } from "@/app/(app)/post/const";
import { DataTable, DataTableProps } from "@/components/ui/data-table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Typography } from "@/components/ui/typography";
import { DEFAULT_DATE_FORMAT } from "@/const/date";
import { useGenerateSearchParamsUrl } from "@/hooks/use-generate-search-params-url";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import {
  Check,
  Ghost,
  ThumbsDown,
  ThumbsUp,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { MyPostActionsDropdown } from "./my-post-actions";

type MyPostsTableType = Exclude<
  Awaited<ReturnType<typeof getMyPostsAction>>["data"],
  undefined
>[number];

type OmittedProps = Omit<
  DataTableProps<MyPostsTableType, MyPostsTableType>,
  "columns"
>;

type MyPostsTableProps = OmittedProps;

export const MyPostsTable = (props: MyPostsTableProps) => {
  const { ...rest } = props;
  const router = useRouter();
  const createPageURL = useGenerateSearchParamsUrl();

  const columns: ColumnDef<MyPostsTableType>[] = [
    {
      accessorKey: "title",
      header: "Post title",
      cell: (cell) => (
        <Typography styling="xs">{cell.row.original.title}</Typography>
      ),
    },
    {
      accessorKey: "publicationDate",
      header: "Publication/Scheduled",
      cell: (cell) =>
        !cell.row.original.isPublished ? (
          dayjs(cell.row.original.publicationDate).isValid() ? (
            <Typography className="text-center" styling="xs">
              {dayjs(cell.row.original.publicationDate).format(
                DEFAULT_DATE_FORMAT
              )}
            </Typography>
          ) : (
            <X className="w-4 h-4 mx-auto" />
          )
        ) : (
          <Tooltip>
            <TooltipTrigger className="mx-auto flex">
              <Check className="w-4 h-4" />
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
                <ThumbsUp className="w-4 h-4" />
                {cell.row.original.reactions.likes}
              </TooltipTrigger>
              <TooltipContent>Likes</TooltipContent>
            </Tooltip>
          </li>
          <li>
            <Tooltip>
              <TooltipTrigger className="flex items-center gap-1">
                <ThumbsDown className="w-4 h-4" />
                {cell.row.original.reactions.dislikes}
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
                <Users className="w-4 h-4" />
                {cell.row.original.views.total}
              </TooltipTrigger>
              <TooltipContent>Total views</TooltipContent>
            </Tooltip>
          </li>
          <li className="pr-2 border-r">
            <Tooltip>
              <TooltipTrigger className="flex items-center gap-1">
                <Ghost className="w-4 h-4" />
                {cell.row.original.views.anonymous}
              </TooltipTrigger>
              <TooltipContent>Not authorized users</TooltipContent>
            </Tooltip>
          </li>
          <li>
            <Tooltip>
              <TooltipTrigger className="flex items-center gap-1">
                <UserCheck className="w-4 h-4" />
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
        <MyPostActionsDropdown
          postId={cell.row.original.id}
          canSchedulePublication={cell.row.original.canSchedulePublication}
          onDeletePostClick={() =>
            router.replace(
              createPageURL(
                cell.row.original.id,
                MyPostsSearchParams.deletePost
              )
            )
          }
          onSchedulePublicationDateClick={() =>
            router.replace(
              createPageURL(
                cell.row.original.id,
                MyPostsSearchParams.schedulePublicationDate
              )
            )
          }
        />
      ),
    },
  ];

  return <DataTable {...rest} columns={columns} />;
};

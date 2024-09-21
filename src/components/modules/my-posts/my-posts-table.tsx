"use client";

import { getMyPostsAction } from "@/app/(app)/post/actions/get-posts";
import { MyPostsSearchParams } from "@/app/(app)/post/const";
import { Button } from "@/components/ui/button";
import { DataTable, DataTableProps } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Typography } from "@/components/ui/typography";
import { ProjectUrls } from "@/const";
import { DEFAULT_DATE_FORMAT } from "@/const/date";
import { useGenerateSearchParamsUrl } from "@/hooks/use-generate-search-params-url";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import {
  Calendar,
  Check,
  Ellipsis,
  Eye,
  Ghost,
  Pencil,
  ThumbsDown,
  ThumbsUp,
  Trash,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";

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
                {cell.row.original.likes}
              </TooltipTrigger>
              <TooltipContent>Likes</TooltipContent>
            </Tooltip>
          </li>
          <li>
            <Tooltip>
              <TooltipTrigger className="flex items-center gap-1">
                <ThumbsDown className="w-4 h-4" />
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
      cell: (cell) => {
        const canSchedule = cell.row.original.canSchedulePublication;
        const scheduleInner = (
          <>
            <Calendar className="w-4 h-4" /> Schedule post
          </>
        );

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                variant={"outline"}
                color={"secondary"}
                aria-label="Open menu"
              >
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link
                  href={ProjectUrls.myPost(cell.row.original.id)}
                  className="flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" /> See post
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={ProjectUrls.editMyPost(cell.row.original.id)}
                  className="flex items-center gap-2"
                >
                  <Pencil className="w-4 h-4" /> Edit post
                </Link>
              </DropdownMenuItem>
              {canSchedule ? (
                <DropdownMenuItem asChild>
                  <Link
                    href={createPageURL(
                      cell.row.original.id,
                      MyPostsSearchParams.schedulePublicationDate
                    )}
                    className="flex items-center gap-2"
                  >
                    {scheduleInner}
                  </Link>
                </DropdownMenuItem>
              ) : (
                <Tooltip>
                  <TooltipTrigger>
                    <DropdownMenuItem disabled asChild>
                      <button className="flex items-center gap-2">
                        {scheduleInner}
                      </button>
                    </DropdownMenuItem>
                  </TooltipTrigger>
                  <TooltipContent>
                    The publication date cannot be changed as the post has
                    already been published.
                  </TooltipContent>
                </Tooltip>
              )}

              <DropdownMenuItem asChild>
                <Link
                  href={createPageURL(
                    cell.row.original.id,
                    MyPostsSearchParams.deletePost
                  )}
                  className="flex items-center gap-2 text-destructive"
                >
                  <Trash className="w-4 h-4" /> Delete post
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return <DataTable {...rest} columns={columns} />;
};

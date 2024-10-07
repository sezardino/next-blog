"use client";

import { getMyUpcomingPosts } from "@/app/(app)/dashboard/actions/upcoming-posts";
import { Card, CardHeader } from "@/components/ui/card";
import { DataTable, DataTableProps } from "@/components/ui/data-table";
import { Typography } from "@/components/ui/typography";
import { DEFAULT_DATE_FORMAT } from "@/const/date";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

type MyUpcomingPostsWidgetType = Exclude<
  Awaited<ReturnType<typeof getMyUpcomingPosts>>["data"],
  undefined
>[number];

type OmittedProps = Omit<
  DataTableProps<MyUpcomingPostsWidgetType, MyUpcomingPostsWidgetType>,
  "columns"
>;

type MyUpcomingPostsWidgetProps = OmittedProps;

export const MyUpcomingPostsWidget = (props: MyUpcomingPostsWidgetProps) => {
  const { ...rest } = props;

  const columns: ColumnDef<MyUpcomingPostsWidgetType>[] = [
    {
      accessorKey: "title",
      header: () => <Typography styling="xs">Title</Typography>,
      cell: (cell) => (
        <Typography styling="xs">{cell.row.original.title}</Typography>
      ),
    },
    {
      accessorKey: "publicationDate",
      header: () => (
        <Typography styling="xs" className="whitespace-nowrap">
          Publication date
        </Typography>
      ),
      cell: (cell) => (
        <Typography className="text-center" styling="xs">
          {dayjs(cell.row.original.publicationDate).format(DEFAULT_DATE_FORMAT)}
        </Typography>
      ),
    },
    {
      accessorKey: "modifiedAt",
      header: () => (
        <Typography styling="xs" className="whitespace-nowrap">
          Last modification
        </Typography>
      ),
      cell: (cell) => (
        <Typography className="text-center" styling="xs">
          {dayjs(cell.row.original.modifiedAt).format(DEFAULT_DATE_FORMAT)}
        </Typography>
      ),
    },
  ];

  return (
    <Card {...rest}>
      <CardHeader>Upcoming posts</CardHeader>
      <DataTable {...rest} columns={columns} />
    </Card>
  );
};

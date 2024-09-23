"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/utils/styles";
import { ComponentPropsWithoutRef } from "react";

export const description = "A collection of health charts.";

export type PostsStatisticWidgetProps = ComponentPropsWithoutRef<"div"> & {
  total: number;
  published: number;
  scheduled: number;
  unpublished: number;
  draft: number;
};

export const PostsStatisticWidget = (props: PostsStatisticWidgetProps) => {
  const {
    draft,
    published,
    scheduled,
    total,
    unpublished,
    className,
    ...rest
  } = props;

  const statistics = [
    {
      label: "Published",
      value: published,
    },
    {
      label: "Unpublished",
      value: unpublished,
    },
    {
      label: "Scheduled",
      value: scheduled,
    },
    {
      label: "Draft",
      value: draft,
    },
  ];

  return (
    <Card
      {...rest}
      className={cn(
        "flex flex-col sm:flex-row items-center gap-5 p-5",
        className
      )}
    >
      <CardHeader className="p-0">
        <CardTitle>Posts</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ul className="flex flex-wrap gap-2">
          {statistics.map((statistic, index) => (
            <li
              key={index}
              className="flex-1 auto-rows-min gap-0.5 p-2 border rounded-lg text-center"
            >
              <Typography styling="small" className="text-muted-foreground">
                {statistic.label}
              </Typography>
              <Typography styling="lead">{statistic.value}</Typography>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

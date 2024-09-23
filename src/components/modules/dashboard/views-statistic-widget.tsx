"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SemicircleChart } from "@/components/ui/semi-circle-chart";
import { ComponentPropsWithoutRef } from "react";

export const description = "A collection of health charts.";

export type ViewsStatisticWidgetProps = ComponentPropsWithoutRef<"div"> & {
  total: number;
  anonymous: number;
  authorized: number;
};

export const ViewsStatisticWidget = (props: ViewsStatisticWidgetProps) => {
  const { anonymous, authorized, total, ...rest } = props;

  const statistics = [
    { label: "Anonymous", value: anonymous },
    { label: "Authorized", value: authorized },
  ];

  return (
    <Card {...rest} className="relative">
      <CardHeader className="w-full absolute bottom-5 text-center">
        <CardTitle>Views for your posts</CardTitle>
      </CardHeader>
      <CardContent className="pb-0">
        <SemicircleChart
          statistics={statistics}
          total={total}
          label="Views"
          className="mx-auto"
        />
      </CardContent>
    </Card>
  );
};

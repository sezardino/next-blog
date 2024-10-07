"use client";

import { ChartStatistic, useChart } from "@/hooks/use-chart";
import { ComponentPropsWithoutRef } from "react";
import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";
import { ChartContainer } from "./chart";

type Props = ComponentPropsWithoutRef<"div"> & {
  statistics: ChartStatistic[];
};

export const ProgressChart = (props: Props) => {
  const { statistics, ...rest } = props;

  const { config, data } = useChart(statistics);

  return (
    <ChartContainer {...rest} config={config}>
      <BarChart data={data} layout="vertical" barSize={32} barGap={2}>
        <XAxis type="number" dataKey="value" hide />
        <YAxis
          dataKey="labelKey"
          type="category"
          tickLine={false}
          tickMargin={4}
          axisLine={false}
          className="capitalize"
        />
        <Bar dataKey="value" radius={5}>
          <LabelList
            position="insideLeft"
            dataKey="value"
            fill="white"
            offset={8}
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};

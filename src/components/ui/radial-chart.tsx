"use client";

import { useChart } from "@/hooks/use-chart";
import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./chart";

export const description = "A collection of health charts.";

type Props = {
  statistics: { label: string; value: number }[];
  total: number;
};

export const RadialChart = (props: Props) => {
  const { statistics, total } = props;
  const { config, data } = useChart(statistics);

  return (
    <ChartContainer
      config={config}
      className="aspect-square w-full max-w-[150px]"
    >
      <RadialBarChart
        data={data}
        innerRadius="20%"
        barSize={24}
        startAngle={90}
        endAngle={450}
      >
        <PolarAngleAxis
          type="number"
          domain={[0, total]}
          dataKey="value"
          tick={false}
        />
        <ChartTooltip content={<ChartTooltipContent nameKey="labelKey" />} />
        <RadialBar dataKey="value" background cornerRadius={5} />
      </RadialBarChart>
    </ChartContainer>
  );
};

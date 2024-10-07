"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChartStatistic, generateChartKey } from "@/hooks/use-chart";
import { cn } from "@/utils/styles";
import { faker } from "@faker-js/faker";
import { ComponentPropsWithoutRef, useMemo } from "react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import { Typography } from "./typography";

type Props = ComponentPropsWithoutRef<"div"> & {
  statistics: ChartStatistic[];
  total: number;
  label: string;
};

export const SemicircleChart = (props: Props) => {
  const { total, statistics, label, className, ...rest } = props;

  const formattedStatistics = useMemo(
    () =>
      statistics.map((s) => ({
        ...s,
        key: generateChartKey(s.label),
        color: `hsl(var(--chart-${faker.helpers.arrayElement([
          1, 2, 3, 4, 5,
        ])}))`,
      })),
    [statistics]
  );

  const data = useMemo(() => {
    const d: Record<string, number> = {};

    formattedStatistics.forEach((s) => (d[s.key] = s.value));

    return [d];
  }, []);

  const config = useMemo(() => {
    const c: Record<string, { label: string; color: string }> = {};

    formattedStatistics.forEach(
      (s) =>
        (c[s.key] = {
          color: s.color,
          label: s.label,
        })
    );

    return c;
  }, []);

  return (
    <ChartContainer
      {...rest}
      config={config}
      className={cn("aspect-square max-w-[150px]", className)}
    >
      <RadialBarChart
        data={data}
        endAngle={180}
        innerRadius={48}
        outerRadius={78}
      >
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                    <Typography asChild weight="bold" styling="large">
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) - 16}
                        className="fill-foreground"
                      >
                        {total}
                      </tspan>
                    </Typography>
                    <Typography asChild styling="small">
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 4}
                        className="fill-muted-foreground"
                      >
                        {label}
                      </tspan>
                    </Typography>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
        {formattedStatistics.map((s) => (
          <RadialBar
            key={s.key}
            dataKey={s.key}
            stackId="a"
            background
            cornerRadius={5}
            fill={`var(--color-${s.key})`}
            className="stroke-transparent stroke-2"
          />
        ))}
      </RadialBarChart>
    </ChartContainer>
  );
};

"use client";

import { faker } from "@faker-js/faker";
import { useMemo } from "react";

export const description = "A collection of health charts.";

export type ChartStatistic = { label: string; value: number };

export const generateChartKey = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

const colors = [1, 2, 3, 4, 5];

export const useChart = (statistics: ChartStatistic[]) => {
  const formattedStatistics = useMemo(
    () =>
      statistics.map((s, i) => ({
        ...s,
        key: generateChartKey(s.label),
        color: `hsl(var(--chart-${faker.helpers.arrayElement(colors)}))`,
      })),
    [statistics]
  );

  const config = useMemo(
    () =>
      Object.fromEntries(
        formattedStatistics.map(({ key, ...rest }) => [key, rest])
      ),
    [formattedStatistics]
  );

  const data = useMemo(
    () =>
      formattedStatistics.reverse().map(({ key, value }) => ({
        labelKey: key,
        value,
        fill: `var(--color-${key})`,
      })),
    [formattedStatistics]
  );

  return { config, data };
};

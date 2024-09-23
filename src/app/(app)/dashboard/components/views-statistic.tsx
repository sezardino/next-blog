import {
  ViewsStatisticWidget,
  ViewsStatisticWidgetProps,
} from "@/components/modules/dashboard/views-statistic-widget";
import { getViewsStatistics } from "../actions/views-statistic";

type OmittedProps = Omit<
  ViewsStatisticWidgetProps,
  "total" | "anonymous" | "authorized"
>;

export const ViewsStatistic = async (props: OmittedProps) => {
  const response = await getViewsStatistics();

  if ("message" in response) return null;

  const { anonymous, authorized, total } = response;

  return (
    <ViewsStatisticWidget
      {...props}
      total={total}
      anonymous={anonymous}
      authorized={authorized}
    />
  );
};

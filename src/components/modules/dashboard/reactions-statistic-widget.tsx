"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SemicircleChart } from "@/components/ui/semi-circle-chart";

type Props = {
  total: number;
  likes: number;
  dislikes: number;
};

export const ReactionsStatisticWidget = (props: Props) => {
  const { total, likes, dislikes } = props;

  return (
    <Card className="relative">
      <CardHeader className="w-full absolute bottom-5 text-center">
        <CardTitle>Reactions for your posts</CardTitle>
      </CardHeader>
      <CardContent className="pb-0">
        <SemicircleChart
          statistics={[
            { label: "Likes", value: likes },
            { label: "Dislikes", value: dislikes },
          ]}
          total={total}
          label="Reactions"
          className="mx-auto"
        />
      </CardContent>
    </Card>
  );
};

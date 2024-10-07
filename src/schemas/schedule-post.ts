import dayjs from "dayjs";
import { z } from "zod";

export const SchedulePostSchema = z.object({
  date: z
    .date()
    .refine((date) => dayjs(date).isAfter(dayjs(new Date()).add(-1, "day")), {
      message: "Publication date must be in the future",
    }),
});

export type SchedulePost = z.infer<typeof SchedulePostSchema>;

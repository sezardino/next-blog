import dayjs from "dayjs";

type ReturnString = "already-published";

export const checkIfPostCanBeModified = (
  isPublished: boolean,
  publicationDate: Date | null
): ReturnString | void => {
  if (isPublished || dayjs(publicationDate).isBefore(new Date()))
    return "already-published";
};

export const checkIfPostCanBePublished = (publicationDate?: Date | null) =>
  dayjs(publicationDate).isSame(new Date(), "date");

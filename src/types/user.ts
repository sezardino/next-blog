import { User } from "@prisma/client";

export type CurrentUserData = Pick<
  User,
  "avatarUrl" | "email" | "firstName" | "lastName"
>;

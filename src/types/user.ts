import { User } from "@prisma/client";

export type CurrentUserData = Pick<User, "email" | "firstName" | "lastName"> & {
  avatarUrl: string | null;
};

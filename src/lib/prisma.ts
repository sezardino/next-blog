import { PrismaClient } from "@prisma/client";

declare global {
  var prismaClient: PrismaClient | undefined;
}

const prismaClient =
  global.prismaClient ||
  new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });

if (process.env.NODE_ENV === "development") global.prismaClient = prismaClient;

export default prismaClient;

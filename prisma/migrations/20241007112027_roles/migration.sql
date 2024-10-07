-- CreateEnum
CREATE TYPE "UserRoles" AS ENUM ('CONTENT_CREATOR');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "UserRoles" NOT NULL DEFAULT 'CONTENT_CREATOR';

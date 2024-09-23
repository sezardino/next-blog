/*
  Warnings:

  - You are about to drop the column `modyfiedAt` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "modyfiedAt",
ADD COLUMN     "modyfied_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

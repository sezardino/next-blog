/*
  Warnings:

  - You are about to drop the column `modyfied_at` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "modyfied_at",
ADD COLUMN     "modified_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

/*
  Warnings:

  - You are about to drop the column `thumbnail_url` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "thumbnail_url",
ADD COLUMN     "thumbnail_id" TEXT;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_thumbnail_id_fkey" FOREIGN KEY ("thumbnail_id") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

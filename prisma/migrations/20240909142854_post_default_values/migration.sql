-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "description" SET DEFAULT '',
ALTER COLUMN "thumbnail_url" DROP NOT NULL,
ALTER COLUMN "body" SET DEFAULT '',
ALTER COLUMN "publication_date" DROP NOT NULL;

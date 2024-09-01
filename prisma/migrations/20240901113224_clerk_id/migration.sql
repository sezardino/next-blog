-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "clerk_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_clerk_id_key" ON "users"("clerk_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

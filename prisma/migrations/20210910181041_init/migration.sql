/*
  Warnings:

  - Made the column `coffee_facts` on table `coffee_facts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "coffee_facts" ALTER COLUMN "coffee_facts" SET NOT NULL;

-- CreateTable
CREATE TABLE "admin" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "admin_only" BOOLEAN NOT NULL,
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rejected_facts" (
    "id" SERIAL NOT NULL,
    "rejected_facts" TEXT NOT NULL,
    "admin_id" INTEGER NOT NULL,

    CONSTRAINT "rejected_facts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review_facts" (
    "id" SERIAL NOT NULL,
    "review_facts" TEXT NOT NULL,

    CONSTRAINT "review_facts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_username_key" ON "admin"("username");

-- AddForeignKey
ALTER TABLE "coffee_facts" ADD CONSTRAINT "coffee_facts_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rejected_facts" ADD CONSTRAINT "rejected_facts_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

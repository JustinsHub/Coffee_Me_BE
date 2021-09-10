-- CreateTable
CREATE TABLE "coffee_facts" (
    "id" SERIAL NOT NULL,
    "coffee_facts" TEXT,
    "admin_id" INTEGER NOT NULL,

    CONSTRAINT "coffee_facts_pkey" PRIMARY KEY ("id")
);

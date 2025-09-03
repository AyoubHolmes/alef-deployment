/*
  Warnings:

  - You are about to drop the column `documentUrl` on the `publication_issues` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."publication_issues" DROP COLUMN "documentUrl",
ADD COLUMN     "documentUrlAr" TEXT,
ADD COLUMN     "documentUrlFr" TEXT;

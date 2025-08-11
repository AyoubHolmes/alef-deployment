-- CreateEnum
CREATE TYPE "public"."Magazine" AS ENUM ('AMIS_DIONYSOS', 'ART_CHIV', 'BIAIS_ARTISTIQUES', 'BOOKS');

-- CreateTable
CREATE TABLE "public"."cultural_channel_content" (
    "id" SERIAL NOT NULL,
    "pageTitleAr" TEXT NOT NULL,
    "pageTitleFr" TEXT NOT NULL,
    "pageDescriptionAr" TEXT NOT NULL,
    "pageDescriptionFr" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cultural_channel_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."cultural_channel_videos" (
    "id" SERIAL NOT NULL,
    "youtubeId" TEXT NOT NULL,
    "titleAr" TEXT NOT NULL,
    "titleFr" TEXT NOT NULL,
    "descriptionAr" TEXT NOT NULL,
    "descriptionFr" TEXT NOT NULL,
    "thumbnail" TEXT,
    "publishDate" TIMESTAMP(3) NOT NULL,
    "category" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cultural_channel_videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."publication_issues" (
    "id" SERIAL NOT NULL,
    "magazine" "public"."Magazine" NOT NULL,
    "number" INTEGER NOT NULL,
    "titleAr" TEXT NOT NULL,
    "titleFr" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "image" TEXT NOT NULL,
    "featuredAr" TEXT NOT NULL,
    "featuredFr" TEXT NOT NULL,
    "contentAr" TEXT NOT NULL,
    "contentFr" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "publication_issues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."partners_page_content" (
    "id" SERIAL NOT NULL,
    "pageTitleAr" TEXT NOT NULL,
    "pageTitleFr" TEXT NOT NULL,
    "pageDescriptionAr" TEXT NOT NULL,
    "pageDescriptionFr" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "partners_page_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."partners" (
    "id" SERIAL NOT NULL,
    "nameAr" TEXT NOT NULL,
    "nameFr" TEXT NOT NULL,
    "descriptionAr" TEXT NOT NULL,
    "descriptionFr" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "website" TEXT,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "partners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."collaborative_programs" (
    "id" SERIAL NOT NULL,
    "titleAr" TEXT NOT NULL,
    "titleFr" TEXT NOT NULL,
    "descriptionAr" TEXT NOT NULL,
    "descriptionFr" TEXT NOT NULL,
    "partnerNameAr" TEXT NOT NULL,
    "partnerNameFr" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "collaborative_programs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cultural_channel_videos_youtubeId_key" ON "public"."cultural_channel_videos"("youtubeId");

-- CreateIndex
CREATE INDEX "publication_issues_magazine_number_idx" ON "public"."publication_issues"("magazine", "number");

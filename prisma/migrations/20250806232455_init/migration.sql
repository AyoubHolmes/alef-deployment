-- CreateEnum
CREATE TYPE "public"."ExhibitionStatus" AS ENUM ('CURRENT', 'UPCOMING', 'PAST');

-- CreateEnum
CREATE TYPE "public"."ArticleCategory" AS ENUM ('VISUAL_ARTS', 'LITERARY_THOUGHT', 'PROEMES', 'EDUCATION');

-- CreateEnum
CREATE TYPE "public"."WorkshopStatus" AS ENUM ('OPEN', 'ALMOST_FULL', 'FULL', 'COMPLETED');

-- CreateEnum
CREATE TYPE "public"."EventStatus" AS ENUM ('UPCOMING', 'PAST', 'CANCELLED');

-- CreateTable
CREATE TABLE "public"."art_exhibitions" (
    "id" SERIAL NOT NULL,
    "titleAr" TEXT NOT NULL,
    "titleFr" TEXT NOT NULL,
    "artistAr" TEXT NOT NULL,
    "artistFr" TEXT NOT NULL,
    "datesAr" TEXT NOT NULL,
    "datesFr" TEXT NOT NULL,
    "locationAr" TEXT NOT NULL,
    "locationFr" TEXT NOT NULL,
    "descriptionAr" TEXT NOT NULL,
    "descriptionFr" TEXT NOT NULL,
    "image" TEXT,
    "status" "public"."ExhibitionStatus" NOT NULL DEFAULT 'UPCOMING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "art_exhibitions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."articles" (
    "id" SERIAL NOT NULL,
    "titleAr" TEXT NOT NULL,
    "titleFr" TEXT NOT NULL,
    "authorAr" TEXT NOT NULL,
    "authorFr" TEXT NOT NULL,
    "translatorAr" TEXT,
    "translatorFr" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "category" "public"."ArticleCategory" NOT NULL,
    "categoryLabelAr" TEXT NOT NULL,
    "categoryLabelFr" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "excerptAr" TEXT NOT NULL,
    "excerptFr" TEXT NOT NULL,
    "contentAr" TEXT NOT NULL,
    "contentFr" TEXT NOT NULL,
    "additionalImages" TEXT[],
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."workshop_categories" (
    "id" SERIAL NOT NULL,
    "titleAr" TEXT NOT NULL,
    "titleFr" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "descriptionAr" TEXT NOT NULL,
    "descriptionFr" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workshop_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."workshops" (
    "id" SERIAL NOT NULL,
    "titleAr" TEXT NOT NULL,
    "titleFr" TEXT NOT NULL,
    "dateAr" TEXT NOT NULL,
    "dateFr" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "locationAr" TEXT NOT NULL,
    "locationFr" TEXT NOT NULL,
    "instructorAr" TEXT NOT NULL,
    "instructorFr" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "status" "public"."WorkshopStatus" NOT NULL DEFAULT 'OPEN',
    "categoryId" INTEGER NOT NULL,
    "examplesAr" TEXT[],
    "examplesFr" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workshops_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."literary_events" (
    "id" SERIAL NOT NULL,
    "titleAr" TEXT NOT NULL,
    "titleFr" TEXT NOT NULL,
    "dateAr" TEXT NOT NULL,
    "dateFr" TEXT NOT NULL,
    "locationAr" TEXT NOT NULL,
    "locationFr" TEXT NOT NULL,
    "descriptionAr" TEXT NOT NULL,
    "descriptionFr" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "status" "public"."EventStatus" NOT NULL DEFAULT 'UPCOMING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "literary_events_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."workshops" ADD CONSTRAINT "workshops_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."workshop_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

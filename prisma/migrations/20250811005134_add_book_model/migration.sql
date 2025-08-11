-- CreateTable
CREATE TABLE "public"."books" (
    "id" SERIAL NOT NULL,
    "titleAr" TEXT NOT NULL,
    "titleFr" TEXT NOT NULL,
    "authorAr" TEXT NOT NULL,
    "authorFr" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "pages" INTEGER NOT NULL,
    "isbn" TEXT NOT NULL,
    "image" TEXT,
    "descriptionAr" TEXT NOT NULL,
    "descriptionFr" TEXT NOT NULL,
    "summaryAr" TEXT NOT NULL,
    "summaryFr" TEXT NOT NULL,
    "downloadUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "books_isbn_key" ON "public"."books"("isbn");

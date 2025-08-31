-- AlterTable
ALTER TABLE "public"."art_exhibitions" ADD COLUMN     "localisationAr" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "localisationFr" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "organizersAr" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "organizersFr" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "public"."literary_events" ADD COLUMN     "localisationAr" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "localisationFr" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "organizersAr" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "organizersFr" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "public"."workshops" ADD COLUMN     "localisationAr" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "localisationFr" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "organizersAr" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "organizersFr" TEXT NOT NULL DEFAULT '';

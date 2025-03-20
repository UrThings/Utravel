-- AlterTable
ALTER TABLE "BookedTravel" ADD COLUMN     "Enddate" TIMESTAMP(3),
ADD COLUMN     "Startdate" TIMESTAMP(3),
ADD COLUMN     "img" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "price" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "CartTravel" ADD COLUMN     "Enddate" TIMESTAMP(3),
ADD COLUMN     "Startdate" TIMESTAMP(3),
ADD COLUMN     "img" TEXT,
ADD COLUMN     "name" TEXT;

-- AlterTable
ALTER TABLE "Travel" ADD COLUMN     "img" TEXT;

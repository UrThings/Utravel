/*
  Warnings:

  - You are about to drop the column `date` on the `Travel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BookedTravel" ADD COLUMN     "bookedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Travel" DROP COLUMN "date",
ADD COLUMN     "Enddate" TIMESTAMP(3),
ADD COLUMN     "Startdate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "position" TEXT NOT NULL DEFAULT 'user';

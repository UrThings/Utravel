/*
  Warnings:

  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderProduct" DROP CONSTRAINT "OrderProduct_orderId_fkey";

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "OrderProduct";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Travel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "marshrut" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "limit" INTEGER NOT NULL,
    "countNow" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Travel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartTravel" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "travelId" TEXT NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "CartTravel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookedTravel" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "travelId" TEXT NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "BookedTravel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- AddForeignKey
ALTER TABLE "CartTravel" ADD CONSTRAINT "CartTravel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartTravel" ADD CONSTRAINT "CartTravel_travelId_fkey" FOREIGN KEY ("travelId") REFERENCES "Travel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookedTravel" ADD CONSTRAINT "BookedTravel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookedTravel" ADD CONSTRAINT "BookedTravel_travelId_fkey" FOREIGN KEY ("travelId") REFERENCES "Travel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

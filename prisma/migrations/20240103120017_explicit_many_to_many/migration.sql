/*
  Warnings:

  - You are about to drop the `_BusesToDrivers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BusesToDrivers" DROP CONSTRAINT "_BusesToDrivers_A_fkey";

-- DropForeignKey
ALTER TABLE "_BusesToDrivers" DROP CONSTRAINT "_BusesToDrivers_B_fkey";

-- DropTable
DROP TABLE "_BusesToDrivers";

-- CreateTable
CREATE TABLE "DriversOnBus" (
    "busesId" INTEGER NOT NULL,
    "driversId" INTEGER NOT NULL,

    CONSTRAINT "DriversOnBus_pkey" PRIMARY KEY ("busesId","driversId")
);

-- AddForeignKey
ALTER TABLE "DriversOnBus" ADD CONSTRAINT "DriversOnBus_busesId_fkey" FOREIGN KEY ("busesId") REFERENCES "Buses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DriversOnBus" ADD CONSTRAINT "DriversOnBus_driversId_fkey" FOREIGN KEY ("driversId") REFERENCES "Drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

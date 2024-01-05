/*
  Warnings:

  - You are about to drop the `DriversOnBus` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DriversOnBus" DROP CONSTRAINT "DriversOnBus_busesId_fkey";

-- DropForeignKey
ALTER TABLE "DriversOnBus" DROP CONSTRAINT "DriversOnBus_driversId_fkey";

-- DropTable
DROP TABLE "DriversOnBus";

-- CreateTable
CREATE TABLE "_BusesToDrivers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BusesToDrivers_AB_unique" ON "_BusesToDrivers"("A", "B");

-- CreateIndex
CREATE INDEX "_BusesToDrivers_B_index" ON "_BusesToDrivers"("B");

-- AddForeignKey
ALTER TABLE "_BusesToDrivers" ADD CONSTRAINT "_BusesToDrivers_A_fkey" FOREIGN KEY ("A") REFERENCES "Buses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BusesToDrivers" ADD CONSTRAINT "_BusesToDrivers_B_fkey" FOREIGN KEY ("B") REFERENCES "Drivers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

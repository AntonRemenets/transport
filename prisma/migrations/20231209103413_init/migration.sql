-- CreateEnum
CREATE TYPE "Category" AS ENUM ('A', 'B', 'C', 'D');

-- CreateTable
CREATE TABLE "BusRoutes" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,
    "busesId" INTEGER,

    CONSTRAINT "BusRoutes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Buses" (
    "id" SERIAL NOT NULL,
    "vehicle_number" TEXT NOT NULL,
    "vin" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "driversId" INTEGER,

    CONSTRAINT "Buses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Drivers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "license" TEXT NOT NULL,

    CONSTRAINT "Drivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Waybills" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "busesId" INTEGER NOT NULL,
    "start_mileage" DOUBLE PRECISION NOT NULL,
    "end_mileage" DOUBLE PRECISION NOT NULL,
    "mileage" DOUBLE PRECISION NOT NULL,
    "busRoutesId" INTEGER NOT NULL,
    "driversId" INTEGER NOT NULL,

    CONSTRAINT "Waybills_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BusRoutes_title_key" ON "BusRoutes"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Buses_vehicle_number_key" ON "Buses"("vehicle_number");

-- CreateIndex
CREATE UNIQUE INDEX "Buses_vin_key" ON "Buses"("vin");

-- CreateIndex
CREATE UNIQUE INDEX "Waybills_busesId_key" ON "Waybills"("busesId");

-- CreateIndex
CREATE UNIQUE INDEX "Waybills_busRoutesId_key" ON "Waybills"("busRoutesId");

-- CreateIndex
CREATE UNIQUE INDEX "Waybills_driversId_key" ON "Waybills"("driversId");

-- AddForeignKey
ALTER TABLE "BusRoutes" ADD CONSTRAINT "BusRoutes_busesId_fkey" FOREIGN KEY ("busesId") REFERENCES "Buses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Buses" ADD CONSTRAINT "Buses_driversId_fkey" FOREIGN KEY ("driversId") REFERENCES "Drivers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Waybills" ADD CONSTRAINT "Waybills_busesId_fkey" FOREIGN KEY ("busesId") REFERENCES "Buses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Waybills" ADD CONSTRAINT "Waybills_busRoutesId_fkey" FOREIGN KEY ("busRoutesId") REFERENCES "BusRoutes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Waybills" ADD CONSTRAINT "Waybills_driversId_fkey" FOREIGN KEY ("driversId") REFERENCES "Drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

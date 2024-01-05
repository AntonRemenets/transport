-- CreateTable
CREATE TABLE "BusRoutes" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "BusRoutes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Buses" (
    "id" SERIAL NOT NULL,
    "vehicle_number" TEXT NOT NULL,
    "vin" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "busRoutesId" INTEGER NOT NULL,

    CONSTRAINT "Buses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Drivers" (
    "id" SERIAL NOT NULL,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "patronymic" TEXT DEFAULT '',
    "license" TEXT NOT NULL,

    CONSTRAINT "Drivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BusesToDrivers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "BusRoutes_title_key" ON "BusRoutes"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Buses_vehicle_number_key" ON "Buses"("vehicle_number");

-- CreateIndex
CREATE UNIQUE INDEX "Buses_vin_key" ON "Buses"("vin");

-- CreateIndex
CREATE UNIQUE INDEX "_BusesToDrivers_AB_unique" ON "_BusesToDrivers"("A", "B");

-- CreateIndex
CREATE INDEX "_BusesToDrivers_B_index" ON "_BusesToDrivers"("B");

-- AddForeignKey
ALTER TABLE "Buses" ADD CONSTRAINT "Buses_busRoutesId_fkey" FOREIGN KEY ("busRoutesId") REFERENCES "BusRoutes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BusesToDrivers" ADD CONSTRAINT "_BusesToDrivers_A_fkey" FOREIGN KEY ("A") REFERENCES "Buses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BusesToDrivers" ADD CONSTRAINT "_BusesToDrivers_B_fkey" FOREIGN KEY ("B") REFERENCES "Drivers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

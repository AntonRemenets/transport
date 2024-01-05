import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateBusDto } from './dto/create-bus.dto'
import { UpdateBusDto } from './dto/update-bus.dto'
import { PrismaService } from '../prisma/prisma.service'
import toUpperCaseTransform from '../utils/toUpperString'

@Injectable()
export class BusesService {
  constructor(private prisma: PrismaService) {}

  //GetAll
  async findAll() {
    return this.prisma.buses.findMany({
      include: { drivers: true },
    })
  }

  //FindOne
  async findOne(id: number) {
    const candidate = await this.prisma.buses.findUnique({
      where: { id },
      include: { drivers: true },
    })
    if (!candidate) {
      throw new BadRequestException('Автобус в базе не найден')
    }

    return candidate
  }

  //Create
  async create(dto: CreateBusDto) {
    const {
      vehicle_number,
      vin,
      category,
      brand,
      model,
      busRoutesId,
      driverId,
    } = toUpperCaseTransform(dto)
    const numbers = await this.prisma.buses.findFirst({
      where: { OR: [{ vehicle_number }, { vin }] },
    })

    if (numbers) {
      throw new BadRequestException(
        'Автобус с такими номерами ВИН или ГОС уже существует',
      )
    }

    if (driverId) {
      const driver = await this.prisma.drivers.findFirst({
        where: { id: driverId },
      })
      if (!driver) {
        throw new BadRequestException('Такого водителя не существует')
      }
      return this.prisma.buses.create({
        data: {
          vehicle_number,
          vin,
          category,
          brand,
          model,
          busRoutesId,
          drivers: { connect: { id: driverId } },
        },
        include: { drivers: true },
      })
    } else {
      return this.prisma.buses.create({
        data: {
          vehicle_number,
          vin,
          category,
          brand,
          model,
          busRoutesId,
        },
        include: { drivers: true },
      })
    }
  }

  //Update
  async update(id: number, dto: UpdateBusDto) {
    const {
      vin,
      vehicle_number,
      category,
      brand,
      model,
      busRoutesId,
      addDriverId,
      removeDriverId,
    } = toUpperCaseTransform(dto)
    const candidate = await this.prisma.buses.findUnique({
      where: { id },
    })
    if (!candidate) {
      throw new BadRequestException('Автобус в базе не найден')
    }
    if (!addDriverId && !removeDriverId) {
      return this.prisma.buses.update({
        where: { id },
        data: {
          vin,
          vehicle_number,
          category,
          brand,
          model,
          busRoutesId,
        },
        include: { drivers: true },
      })
    }

    if (!removeDriverId) {
      const driver = await this.prisma.drivers.findFirst({
        where: { id: addDriverId },
      })
      if (!driver) {
        throw new BadRequestException('Такого водителя не существует')
      }

      return this.prisma.buses.update({
        where: { id },
        data: {
          vin,
          vehicle_number,
          category,
          brand,
          model,
          busRoutesId,
          drivers: { connect: { id: addDriverId } },
        },
        include: { drivers: true },
      })
    } else {
      const driver = await this.prisma.drivers.findFirst({
        where: { id: removeDriverId },
      })
      if (!driver) {
        throw new BadRequestException('Такого водителя не существует')
      }

      return this.prisma.buses.update({
        where: { id },
        data: {
          vin,
          vehicle_number,
          category,
          brand,
          model,
          busRoutesId,
          drivers: { disconnect: { id: removeDriverId } },
        },
        include: { drivers: true },
      })
    }
  }

  //Delete
  async remove(id: number) {
    const candidate = await this.prisma.buses.findUnique({
      where: { id },
    })
    if (!candidate) {
      throw new BadRequestException('Автобус в базе не найден')
    }

    return this.prisma.buses.delete({
      where: { id },
    })
  }
}

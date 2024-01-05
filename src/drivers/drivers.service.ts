import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateDriverDto } from './dto/create-driver.dto'
import { UpdateDriverDto } from './dto/update-driver.dto'
import { PrismaService } from '../prisma/prisma.service'
import toUpperCaseTransform from '../utils/toUpperString'

@Injectable()
export class DriversService {
  constructor(private prisma: PrismaService) {}

  //GetAll
  async findAll() {
    return this.prisma.drivers.findMany({ include: { buses: true } })
  }

  //GetOne
  async findOne(id: number) {
    const candidate = await this.prisma.drivers.findUnique({
      where: { id },
      include: { buses: true },
    })
    if (!candidate) {
      throw new BadRequestException('Водитель в базе не найден')
    }
    return candidate
  }

  //Create
  async create(dto: CreateDriverDto) {
    const { lastName, firstName, patronymic, license, busId } =
      toUpperCaseTransform(dto)

    if (busId) {
      const candidate = await this.prisma.buses.findFirst({
        where: { id: busId },
      })
      if (!candidate) {
        throw new BadRequestException(`Автобуса с id: ${busId} не существует`)
      }

      return this.prisma.drivers.create({
        data: {
          lastName,
          firstName,
          patronymic,
          license,
          buses: { connect: { id: busId } },
        },
        include: { buses: true },
      })
    } else {
      return this.prisma.drivers.create({
        data: {
          lastName,
          firstName,
          patronymic,
          license,
        },
      })
    }
  }

  //Update
  async update(id: number, dto: UpdateDriverDto) {
    const { lastName, firstName, patronymic, license, addBusId, removeBusId } =
      toUpperCaseTransform(dto)
    //проверка на существование водителя с id
    const candidate = await this.prisma.drivers.findUnique({
      where: { id },
    })
    if (!candidate) {
      throw new BadRequestException('Водитель в базе не найден')
    }

    //если аргументы на добаваление и стирание не приходят
    if (!addBusId && !removeBusId) {
      return this.prisma.drivers.update({
        where: { id },
        data: {
          lastName,
          firstName,
          patronymic,
          license,
        },
        include: { buses: true },
      })
    }

    //если какойто из аргуметов приходит
    if (!removeBusId) {
      const bus = await this.prisma.buses.findFirst({
        where: { id: addBusId },
      })
      if (!bus) {
        throw new BadRequestException('Такого автобуса не существует')
      }

      return this.prisma.drivers.update({
        where: { id },
        data: {
          lastName,
          firstName,
          patronymic,
          license,
          buses: { connect: { id: addBusId } },
        },
        include: { buses: true },
      })
    } else {
      const bus = await this.prisma.buses.findFirst({
        where: { id: removeBusId },
      })
      if (!bus) {
        throw new BadRequestException('Такого автобуса не существует')
      }
      return this.prisma.drivers.update({
        where: { id },
        data: {
          lastName,
          firstName,
          patronymic,
          license,
          buses: { disconnect: { id: removeBusId } },
        },
        include: { buses: true },
      })
    }
  }

  //Delete
  async remove(id: number) {
    const candidate = await this.prisma.drivers.findUnique({
      where: { id },
    })
    if (!candidate) {
      throw new BadRequestException('Водитель в базе не найден')
    }

    return this.prisma.drivers.delete({
      where: { id },
    })
  }
}

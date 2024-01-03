import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateDriverDto } from './dto/create-driver.dto'
import { UpdateDriverDto } from './dto/update-driver.dto'
import { PrismaService } from '../prisma/prisma.service'
import { DriverType } from './driver.entity'
import toUpperCaseTransform from '../utils/toUpperString'

@Injectable()
export class DriversService {
  constructor(private prisma: PrismaService) {}

  //GetAll
  async findAll(): Promise<DriverType[]> {
    return this.prisma.drivers.findMany()
  }

  //GetOne
  async findOne(id: number): Promise<DriverType> {
    const candidate = await this.prisma.drivers.findUnique({
      where: { id },
    })
    if (!candidate) {
      throw new BadRequestException('Водитель в базе не найден')
    }
    return candidate
  }

  //Create
  async create(dto: CreateDriverDto): Promise<DriverType> {
    const { lastName, firstName, patronymic, license, busesId } =
      toUpperCaseTransform(dto)
    const candidate = await this.prisma.buses.findFirst({
      where: { id: busesId },
    })
    if (!candidate) {
      throw new BadRequestException(`Автобуса с id: ${busesId} не существует`)
    }

    return this.prisma.drivers.create({
      data: {
        lastName,
        firstName,
        patronymic,
        license,
        busesId,
      },
    })
  }

  //Update
  async update(id: number, dto: UpdateDriverDto): Promise<DriverType> {
    const { lastName, firstName, patronymic, license, busesId } =
      toUpperCaseTransform(dto)
    const candidate = await this.prisma.drivers.findUnique({
      where: { id },
    })
    if (!candidate) {
      throw new BadRequestException('Водитель в базе не найден')
    }

    return this.prisma.drivers.update({
      where: { id },
      data: {
        lastName,
        firstName,
        patronymic,
        license,
        busesId,
      },
    })
  }

  //Delete
  async remove(id: number): Promise<DriverType> {
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

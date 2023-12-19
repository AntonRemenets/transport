import { Injectable } from '@nestjs/common'
import { CreateDriverDto } from './dto/create-driver.dto'
import { UpdateDriverDto } from './dto/update-driver.dto'
import { PrismaService } from '../prisma/prisma.service'
import { Driver } from './entities/driver.entity'
import toUpperCaseTransform from '../utils/toUpperString'

@Injectable()
export class DriversService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDriverDto): Promise<Driver> {
    try {
      const { lastName, firstName, patronymic, license, busesId } =
        toUpperCaseTransform(dto)

      return this.prisma.drivers.create({
        data: {
          lastName,
          firstName,
          patronymic,
          license,
          busesId,
        },
      })
    } catch (e) {
      console.log(e)
    }
  }

  async findAll(): Promise<Driver[]> {
    return this.prisma.drivers.findMany()
  }

  async findOne(id: number): Promise<Driver> {
    try {
      return this.prisma.drivers.findUnique({
        where: { id },
      })
    } catch (e) {
      console.log(e)
    }
  }

  async update(id: number, dto: UpdateDriverDto): Promise<Driver> {
    try {
      const { lastName, firstName, patronymic, license, busesId } =
        toUpperCaseTransform(dto)

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
    } catch (e) {
      console.log(e)
    }
  }

  async remove(id: number): Promise<Driver> {
    try {
      return this.prisma.drivers.delete({
        where: { id },
      })
    } catch (e) {
      console.log(e)
    }
  }
}

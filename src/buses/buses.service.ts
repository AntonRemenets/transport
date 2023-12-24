import { Injectable } from '@nestjs/common'
import { CreateBusDto } from './dto/create-bus.dto'
import { UpdateBusDto } from './dto/update-bus.dto'
import { PrismaService } from '../prisma/prisma.service'
import { Bus } from './bus.entity'
import toUpperCaseTransform from '../utils/toUpperString'

@Injectable()
export class BusesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBusDto): Promise<Bus> {
    try {
      const { vehicle_number, vin, category, brand, model, busRoutesId } =
        toUpperCaseTransform(dto)

      return this.prisma.buses.create({
        data: {
          vehicle_number,
          vin,
          category,
          brand,
          model,
          busRoutesId,
        },
      })
    } catch (e) {
      console.log(e)
    }
  }

  async findAll(): Promise<Bus[]> {
    return this.prisma.buses.findMany()
  }

  async findOne(id: number): Promise<Bus> {
    try {
      return this.prisma.buses.findUnique({
        where: { id },
      })
    } catch (e) {
      console.log(e)
    }
  }

  async update(id: number, dto: UpdateBusDto): Promise<Bus> {
    try {
      const { vin, category, brand, model, busRoutesId } =
        toUpperCaseTransform(dto)

      return this.prisma.buses.update({
        where: { id },
        data: {
          vin,
          category,
          brand,
          model,
          busRoutesId,
        },
      })
    } catch (e) {
      console.log(e)
    }
  }

  async remove(id: number) {
    try {
      return this.prisma.buses.delete({
        where: { id },
      })
    } catch (e) {
      console.log(e)
    }
  }
}

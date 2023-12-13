import { Injectable } from '@nestjs/common'
import { CreateBusDto } from './dto/create-bus.dto'
import { UpdateBusDto } from './dto/update-bus.dto'
import { PrismaService } from '../prisma/prisma.service'
import { Bus } from './entities/bus.entity'

@Injectable()
export class BusesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBusDto): Promise<Bus> {
    try {
      return this.prisma.buses.create({
        data: {
          vehicle_number: dto.vehicle_number.toUpperCase(),
          vin: dto.vin.toUpperCase(),
          category: dto.category.toUpperCase(),
          brand: dto.brand.toUpperCase(),
          model: dto.model.toUpperCase(),
          busRoutesId: dto.busRoutesId,
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
      return this.prisma.buses.update({
        where: { id },
        data: {
          vin: dto.vin.toUpperCase(),
          category: dto.category.toUpperCase(),
          brand: dto.brand.toUpperCase(),
          model: dto.model.toUpperCase(),
          busRoutesId: dto.busRoutesId,
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

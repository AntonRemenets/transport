import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateBusDto } from './dto/create-bus.dto'
import { UpdateBusDto } from './dto/update-bus.dto'
import { PrismaService } from '../prisma/prisma.service'
import toUpperCaseTransform from '../utils/toUpperString'
import { BusType } from './bus.entity'

@Injectable()
export class BusesService {
  constructor(private prisma: PrismaService) {}

  //GetAll
  async findAll(): Promise<BusType[]> {
    return this.prisma.buses.findMany()
  }

  //FindOne
  async findOne(id: number): Promise<BusType> {
    const candidate = await this.prisma.buses.findUnique({
      where: { id },
    })
    if (!candidate) {
      throw new BadRequestException('Автобус в базе не найден')
    }

    return candidate
  }

  //Create
  async create(dto: CreateBusDto): Promise<BusType> {
    const { vehicle_number, vin, category, brand, model, busRoutesId } =
      toUpperCaseTransform(dto)
    const candidate = await this.prisma.buses.findFirst({
      where: { OR: [{ vehicle_number }, { vin }] },
    })
    if (candidate) {
      throw new BadRequestException(
        'Автобус с такими номерами ВИН или ГОС уже существует',
      )
    }

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
  }

  //Update
  async update(id: number, dto: UpdateBusDto): Promise<BusType> {
    const { vin, vehicle_number, category, brand, model, busRoutesId } =
      toUpperCaseTransform(dto)
    const candidate = await this.prisma.buses.findUnique({
      where: { id },
    })
    if (!candidate) {
      throw new BadRequestException('Автобус в базе не найден')
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
      },
    })
  }

  //Delete
  async remove(id: number): Promise<BusType> {
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

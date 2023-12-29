import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { BusRoutes } from '@prisma/client'
import { CreateRouteDto } from './dto/create-route.dto'
import { UpdateRouteDto } from './dto/update-route.dto'
import toUpperCaseTransform from '../utils/toUpperString'

@Injectable()
export class BusRoutesService {
  constructor(private prisma: PrismaService) {}

  // Read
  async getAll(): Promise<BusRoutes[] | null> {
    return this.prisma.busRoutes.findMany()
  }

  // Create
  async createRoute(dto: CreateRouteDto): Promise<BusRoutes> {
    const newRoute = await this.prisma.busRoutes.findUnique({
      where: { title: dto.title },
    })
    if (newRoute) {
      throw new BadRequestException('Такой маршрут уже существует')
    }
    const { title, from, to, distance } = toUpperCaseTransform(dto)

    return this.prisma.busRoutes.create({
      data: {
        title,
        from,
        to,
        distance,
      },
    })
  }

  // Update
  async updateRoute(id: number, dto: UpdateRouteDto): Promise<BusRoutes> {
    const { from, to, distance } = toUpperCaseTransform(dto)

    const candidate = await this.prisma.busRoutes.findUnique({
      where: { id },
    })
    if (!candidate) {
      throw new BadRequestException(`Маршрут ${id} не найден`)
    }

    return this.prisma.busRoutes.update({
      where: { id },
      data: {
        from,
        to,
        distance,
      },
    })
  }

  // Delete
  async deleteRoute(id: number): Promise<BusRoutes> {
    const candidate = await this.prisma.busRoutes.findUnique({
      where: { id },
    })
    if (!candidate) {
      throw new BadRequestException(`Маршрут ${id} не найден`)
    }

    return this.prisma.busRoutes.delete({
      where: { id },
    })
  }
}

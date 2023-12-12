import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { BusRoutes } from '@prisma/client'
import { CreateRouteDto } from './dto/create-route.dto'

@Injectable()
export class BusRoutesService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<BusRoutes[] | null> {
    return this.prisma.busRoutes.findMany()
  }

  async createRoute(dto: CreateRouteDto): Promise<BusRoutes> {
    return this.prisma.busRoutes.create({
      data: {
        title: dto.title.toUpperCase(),
        from: dto.from.toUpperCase(),
        to: dto.to.toUpperCase(),
        distance: dto.distance,
      },
    })
  }
}

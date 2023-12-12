import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { BusRoutes } from '@prisma/client'
import { CreateRouteDto } from './dto/create-route.dto'
import { UpdateRouteDto } from './dto/update-route.dto'

@Injectable()
export class BusRoutesService {
  constructor(private prisma: PrismaService) {}

  // Read
  async getAll(): Promise<BusRoutes[] | null> {
    return this.prisma.busRoutes.findMany()
  }

  // Create
  async createRoute(dto: CreateRouteDto): Promise<BusRoutes> {
    try {
      return this.prisma.busRoutes.create({
        data: {
          title: dto.title.toUpperCase(),
          from: dto.from.toUpperCase(),
          to: dto.to.toUpperCase(),
          distance: dto.distance,
        },
      })
    } catch (e) {
      console.log(e)
    }
  }

  // Update
  async updateRoute(id: number, dto: UpdateRouteDto): Promise<BusRoutes> {
    try {
      return this.prisma.busRoutes.update({
        where: { id },
        data: {
          from: dto.from.toUpperCase(),
          to: dto.to.toUpperCase(),
          distance: dto.distance,
        },
      })
    } catch (e) {
      console.log(e)
    }
  }

  // Delete
  async deleteRoute(id: number): Promise<BusRoutes> {
    try {
      return this.prisma.busRoutes.delete({
        where: { id },
      })
    } catch (e) {
      console.log(e)
    }
  }
}

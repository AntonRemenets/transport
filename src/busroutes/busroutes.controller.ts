import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { BusRoutesService } from './busroutes.service'
import { CreateRouteDto } from './dto/create-route.dto'
import { BusRoutes } from '@prisma/client'
import { UpdateRouteDto } from './dto/update-route.dto'

@Controller('routes')
export class BusRoutesController {
  constructor(private readonly routeService: BusRoutesService) {}

  @Get()
  async getAllRoutes(): Promise<BusRoutes[] | null> {
    return await this.routeService.getAll()
  }

  @Post()
  async createRoute(@Body() dto: CreateRouteDto): Promise<BusRoutes> {
    return await this.routeService.createRoute(dto)
  }

  @Put(':id')
  async updateRoute(
    @Param('id') id: string,
    @Body() dto: UpdateRouteDto,
  ): Promise<BusRoutes> {
    return await this.routeService.updateRoute(Number(id), dto)
  }

  @Delete(':id')
  async deleteRoute(@Param('id') id: string): Promise<BusRoutes> {
    return await this.routeService.deleteRoute(Number(id))
  }
}

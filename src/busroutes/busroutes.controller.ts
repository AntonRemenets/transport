import { Body, Controller, Get, Post } from '@nestjs/common'
import { BusRoutesService } from './busroutes.service'
import { CreateRouteDto } from './dto/create-route.dto'
import { BusRoutes } from '@prisma/client'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Автобусные маршруты')
@Controller('routes')
export class BusRoutesController {
  constructor(private readonly routeService: BusRoutesService) {}

  @Get()
  async getAllRoutes(): Promise<BusRoutes[] | null> {
    return await this.routeService.getAll()
  }

  @Post('create')
  async createRoute(@Body() dto: CreateRouteDto): Promise<BusRoutes> {
    return await this.routeService.createRoute(dto)
  }
}

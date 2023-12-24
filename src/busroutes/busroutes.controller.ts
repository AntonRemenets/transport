import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { BusRoutesService } from './busroutes.service'
import { CreateRouteDto } from './dto/create-route.dto'
import { BusRoutes } from '@prisma/client'
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { BusRoutesType } from './busroute.entity'
import { UpdateRouteDto } from './dto/update-route.dto'

@ApiTags('Автобусные маршруты')
@Controller('routes')
export class BusRoutesController {
  constructor(private readonly routeService: BusRoutesService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Получить все маршруты',
    type: [BusRoutesType],
  })
  async getAllRoutes(): Promise<BusRoutes[] | null> {
    return await this.routeService.getAll()
  }

  @Post()
  @ApiBody({ type: CreateRouteDto })
  @ApiResponse({
    status: 200,
    description: 'Создать маршрут',
    type: BusRoutesType,
  })
  async createRoute(@Body() dto: CreateRouteDto): Promise<BusRoutes> {
    return await this.routeService.createRoute(dto)
  }

  @Put(':id')
  @ApiBody({ type: UpdateRouteDto })
  @ApiResponse({
    status: 200,
    description: 'Обновить информацию о маршруте',
    type: BusRoutesType,
  })
  async updateRoute(
    @Param('id') id: string,
    @Body() dto: UpdateRouteDto,
  ): Promise<BusRoutes> {
    return await this.routeService.updateRoute(Number(id), dto)
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Удалить определенный маршрут',
    type: BusRoutesType,
  })
  async deleteRoute(@Param('id') id: string): Promise<BusRoutes> {
    return await this.routeService.deleteRoute(Number(id))
  }
}

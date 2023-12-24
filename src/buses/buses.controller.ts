import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { BusesService } from './buses.service'
import { CreateBusDto } from './dto/create-bus.dto'
import { UpdateBusDto } from './dto/update-bus.dto'
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Bus } from './bus.entity'

@ApiTags('Автобусы')
@Controller('buses')
export class BusesController {
  constructor(private readonly busesService: BusesService) {}

  @Post()
  @ApiBody({ type: CreateBusDto })
  @ApiResponse({
    status: 200,
    description: 'Внести информацию об автобусе',
    type: Bus,
  })
  async create(@Body() dto: CreateBusDto) {
    return await this.busesService.create(dto)
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Получить список всех автобусов',
    type: [Bus],
  })
  async getAll() {
    return await this.busesService.findAll()
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Получить информацию об автобусе',
    type: Bus,
  })
  async getOne(@Param('id') id: string) {
    return await this.busesService.findOne(Number(id))
  }

  @Patch(':id')
  @ApiBody({ type: UpdateBusDto })
  @ApiResponse({
    status: 200,
    description: 'Обновить информацию о маршруте',
    type: Bus,
  })
  async updateBus(@Param('id') id: string, @Body() dto: UpdateBusDto) {
    return await this.busesService.update(Number(id), dto)
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Удалить автобус',
    type: Bus,
  })
  async removeBus(@Param('id') id: string) {
    return await this.busesService.remove(Number(id))
  }
}

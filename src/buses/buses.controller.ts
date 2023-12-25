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
import { Bus } from './bus.entity'

@Controller('buses')
export class BusesController {
  constructor(private readonly busesService: BusesService) {}

  @Post()
  async create(@Body() dto: CreateBusDto) {
    return await this.busesService.create(dto)
  }

  @Get()
  async getAll() {
    return await this.busesService.findAll()
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.busesService.findOne(Number(id))
  }

  @Patch(':id')
  async updateBus(@Param('id') id: string, @Body() dto: UpdateBusDto) {
    return await this.busesService.update(Number(id), dto)
  }

  @Delete(':id')
  async removeBus(@Param('id') id: string) {
    return await this.busesService.remove(Number(id))
  }
}

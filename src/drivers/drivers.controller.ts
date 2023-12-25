import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { DriversService } from './drivers.service'
import { CreateDriverDto } from './dto/create-driver.dto'
import { UpdateDriverDto } from './dto/update-driver.dto'
import { Driver } from './driver.entity'

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post()
  async createDriver(@Body() dto: CreateDriverDto) {
    return await this.driversService.create(dto)
  }

  @Get()
  async getAll() {
    return await this.driversService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.driversService.findOne(Number(id))
  }

  @Patch(':id')
  async updateDriver(@Param('id') id: string, @Body() dto: UpdateDriverDto) {
    return await this.driversService.update(Number(id), dto)
  }

  @Delete(':id')
  async removeDriver(@Param('id') id: string) {
    return await this.driversService.remove(Number(id))
  }
}

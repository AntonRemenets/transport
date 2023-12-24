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
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Driver } from './driver.entity'

@Controller('drivers')
@ApiTags('Водители')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post()
  @ApiBody({ type: CreateDriverDto })
  @ApiResponse({
    status: 200,
    description: 'Внести информацию о водителе',
    type: Driver,
  })
  async createDriver(@Body() dto: CreateDriverDto) {
    return await this.driversService.create(dto)
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Получить информацию о всех водителях',
    type: [Driver],
  })
  async getAll() {
    return await this.driversService.findAll()
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Получить информацию о водителе',
    type: Driver,
  })
  async findOne(@Param('id') id: string) {
    return await this.driversService.findOne(Number(id))
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Получить информацию о водителе',
    type: Driver,
  })
  async updateDriver(@Param('id') id: string, @Body() dto: UpdateDriverDto) {
    return await this.driversService.update(Number(id), dto)
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Удалить информацию о водителе',
    type: Driver,
  })
  async removeDriver(@Param('id') id: string) {
    return await this.driversService.remove(Number(id))
  }
}

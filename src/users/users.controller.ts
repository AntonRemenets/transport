import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { DeleteUserDto } from './dto/delete-user.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Create
  @Post()
  async create(@Body() dto: CreateUserDto) {
    return await this.usersService.create(dto)
  }

  //FindAll
  @Get()
  async findAll() {
    return await this.usersService.findAll()
  }

  // Find one
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id)
  // }

  // Update
  @Patch()
  async update(@Body() dto: UpdateUserDto) {
    return await this.usersService.update(dto)
  }

  // Delete
  @Delete()
  async remove(@Body() dto: DeleteUserDto) {
    return await this.usersService.remove(dto)
  }
}

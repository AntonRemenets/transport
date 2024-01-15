import { Body, Controller, Delete, Get, Patch, Post, UseInterceptors } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { DeleteUserDto } from './dto/delete-user.dto'
import MongooseClassSerializerInterceptor from '../utils/mongoose.serializer'
import { User } from './entities/user.entity'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Create
  @UseInterceptors(MongooseClassSerializerInterceptor(User))
  //@SerializeOptions({ strategy: 'excludeAll' })
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
  @UseInterceptors(MongooseClassSerializerInterceptor(User))
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
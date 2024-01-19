import { Body, Controller, Delete, Get, Patch, UseGuards, UseInterceptors } from '@nestjs/common'
import { UsersService } from './users.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { DeleteUserDto } from './dto/delete-user.dto'
import MongooseClassSerializerInterceptor from '../utils/mongoose.serializer'
import { Role, User } from './entities/user.entity'
import { Roles } from '../decorators/roles.decorator'
import { RolesGuard } from '../guards/roles.guards'
import { Public } from 'src/decorators/public.decorator'
import { JwtAuthGuard } from '../guards/jwt-auth.guards'

@Public()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Create
  // @UseInterceptors(MongooseClassSerializerInterceptor(User))
  // @Post()
  // async create(@Body() dto: CreateUserDto): Promise<User> {
  //   return await this.usersService.create(dto)
  // }

  //FindAll
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
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

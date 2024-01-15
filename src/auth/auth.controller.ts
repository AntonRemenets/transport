import { BadRequestException, Body, Controller, Post, UseInterceptors } from '@nestjs/common'
import { RegisterDto } from './dto/register.dto'
import { AuthService } from './auth.service'
import MongooseClassSerializerInterceptor from '../utils/mongoose.serializer'
import { User } from '../users/entities/user.entity'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(MongooseClassSerializerInterceptor(User))
  @Post('register')
  async register(@Body() dto: RegisterDto): Promise<User> | null {
    const user: User = await this.authService.register(dto)
    if (!user) {
      throw new BadRequestException(`Не получается зарегистрировать пользователя с данными ${JSON.stringify(dto)}`)
    }
    return user
  }

  // @Post('login')
  // async login() {}

  // @Get('logout')
  // async logout() {}

  // @Get('refresh-tokens')
  // async refreshToken() {}
}

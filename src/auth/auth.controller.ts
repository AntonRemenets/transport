import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common'
import { RegisterDto } from './dto/register.dto'
import { AuthService } from './auth.service'
import MongooseClassSerializerInterceptor from '../utils/mongoose.serializer'
import { User } from '../users/entities/user.entity'
import { LoginDto } from './dto/login.dto'
import { Tokens } from './tokens.interface'
import { Response } from 'express'

const REFRESH_TOKEN = 'refreshtoken'

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

  @Post('login')
  async login(@Body() dto: LoginDto, @Res() res: Response) {
    const tokens: Tokens = await this.authService.login(dto)
    if (!tokens) {
      throw new BadRequestException(`Не получается войти с данными ${JSON.stringify(dto)}`)
    }
    this.setRefreshTokenToCookies(tokens, res)
  }

  // @Get('logout')
  // async logout() {}

  // @Get('refresh-tokens')
  // async refreshToken() {}

  private setRefreshTokenToCookies(tokens: Tokens, res: Response) {
    if (!tokens) {
      throw new UnauthorizedException()
    }
    res.cookie(REFRESH_TOKEN, tokens.refreshToken.token, {
      httpOnly: true,
      sameSite: 'lax',
      expires: new Date(tokens.refreshToken.expiresIn),
      path: '/',
    })
    res.status(HttpStatus.CREATED).json({ accessToken: tokens.accessToken })
  }
}

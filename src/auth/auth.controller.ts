import {
  BadRequestException,
  Body,
  Controller,
  Get,
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
import { Tokens } from './interfaces'
import { Response } from 'express'
import { Cookie } from '../decorators/cookie.decorator'

const REFRESH_TOKEN = 'refreshtoken'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Register user
  @Post('register')
  @UseInterceptors(MongooseClassSerializerInterceptor(User))
  async register(@Body() dto: RegisterDto): Promise<User> | null {
    const user: User = await this.authService.register(dto)
    if (!user) {
      throw new BadRequestException(`Не получается зарегистрировать пользователя с данными ${JSON.stringify(dto)}`)
    }
    return user
  }

  // Login
  @Post('login')
  async login(@Body() dto: LoginDto, @Res() res: Response) {
    const tokens: Tokens = await this.authService.login(dto)
    if (!tokens) {
      throw new BadRequestException(`Не получается войти с данными ${JSON.stringify(dto)}`)
    }
    this.setRefreshTokenToCookies(tokens, res)
  }

  // Logout
  @Get('logout')
  async logout(@Cookie(REFRESH_TOKEN) refreshToken: string, @Res() res: Response) {
    if (!refreshToken) {
      res.sendStatus(HttpStatus.OK)
      return
    }
    await this.authService.deleteRefreshToken(refreshToken)
    res.cookie(REFRESH_TOKEN, '', { httpOnly: true, secure: true, expires: new Date() })
    res.sendStatus(HttpStatus.OK)
  }

  // Get refresh token
  @Get('refresh-tokens')
  async refreshTokens(@Cookie(REFRESH_TOKEN) refreshToken: string, @Res() res: Response) {
    if (!refreshToken) {
      throw new UnauthorizedException()
    }
    const tokens = await this.authService.refreshTokens(refreshToken)
    if (!tokens) {
      throw new UnauthorizedException()
    }
    this.setRefreshTokenToCookies(tokens, res)
  }

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

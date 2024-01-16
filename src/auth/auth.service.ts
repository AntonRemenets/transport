import { Injectable, UnauthorizedException } from '@nestjs/common'
import { RegisterDto } from './dto/register.dto'
import { UsersService } from '../users/users.service'
import { User } from '../users/entities/user.entity'
import { LoginDto } from './dto/login.dto'
import { compareSync } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import { Token } from '../users/entities/token.entity'
import { Model } from 'mongoose'
import { add } from 'date-fns'
import { v4 } from 'uuid'
import { Tokens } from './tokens.interface'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Token.name) private tokenModel: Model<Token>,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Register new user
  async register(dto: RegisterDto): Promise<User> | null {
    return await this.userService.create(dto).catch(err => {
      console.log(err)
      return null
    })
  }

  // Login
  async login(dto: LoginDto): Promise<Tokens> {
    const user: User = await this.userService.findOne(dto.email).catch(err => {
      console.log(err)
      return null
    })
    if (!user || !compareSync(dto.password, user.password)) {
      throw new UnauthorizedException('Не верный логин или пароль')
    }
    return this.generateTokens(user)
  }

  // Generate tokens
  private async generateTokens(user: User): Promise<Tokens> {
    const accessToken: string =
      'Bearer ' +
      this.jwtService.sign({
        id: user._id,
        email: user.email,
        roles: user.roles,
      })
    const refreshToken: Token = await this.getRefreshToken(user._id)
    return { accessToken, refreshToken }
  }

  // Get refresh token
  private async getRefreshToken(userId: string): Promise<Token> {
    const token: Token = await this.tokenModel.findOne({ userId }).exec()
    //const token = _token?.token ?? null

    if (!token) {
      return this.tokenModel.create({
        token: v4(),
        expiresIn: add(new Date(), { months: 1 }),
        userId,
      })
    }

    return this.tokenModel.findOneAndUpdate(
      { token },
      {
        token: v4(),
        expiresIn: add(new Date(), { months: 1 }),
      },
    )
  }
}

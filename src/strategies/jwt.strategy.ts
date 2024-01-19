import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UsersService } from '../users/users.service'
import { User } from '../users/entities/user.entity'
import { JwtPayload } from '../auth/interfaces'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    })
  }

  async validate(payload: JwtPayload) {
    console.log('payload' + payload)
    const user: User = await this.userService.findOne(payload.id).catch(err => {
      console.log(err)
      return null
    })
    if (!user) {
      throw new UnauthorizedException()
    }
    return payload
  }
}

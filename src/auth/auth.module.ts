import { Module } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from '../users/entities/user.entity'
import { Token, TokenSchema } from '../users/entities/token.entity'
import { PassportModule } from '@nestjs/passport'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Token.name, schema: TokenSchema },
    ]),
    PassportModule,
  ],
  providers: [AuthService, UsersService],
  controllers: [AuthController],
  exports: [AuthModule],
})
export class AuthModule {}

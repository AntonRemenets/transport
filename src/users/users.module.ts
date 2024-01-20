import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './entities/user.entity'
import { GUARDS } from '../guards'
import { PassportModule } from '@nestjs/passport'
import { AuthModule } from '../auth/auth.module'
import { JwtStrategy } from '../strategies/jwt.strategy'

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), AuthModule, PassportModule],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy, ...GUARDS],
  exports: [UsersService],
})
export class UsersModule {}

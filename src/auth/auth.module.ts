import { Module } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [UsersService],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

import { Injectable } from '@nestjs/common'
import { RegisterDto } from './dto/register.dto'
import { UsersService } from '../users/users.service'
import { User } from '../users/entities/user.entity'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async register(dto: RegisterDto): Promise<User> | null {
    return await this.userService.create(dto).catch(err => {
      console.log(err)
      return null
    })
  }
}

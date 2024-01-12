import { PartialType } from '@nestjs/mapped-types'
import { CreateUserDto } from './create-user.dto'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty({ message: 'Значение не должно быть пустым' })
  @IsEmail()
  email: string

  @IsNotEmpty({ message: 'Значение не должно быть пустым' })
  password: string
}

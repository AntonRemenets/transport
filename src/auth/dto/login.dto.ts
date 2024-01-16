import { IsEmail, IsNotEmpty } from 'class-validator'

export class LoginDto {
  @IsNotEmpty({ message: 'Значение не должно быть пустым' })
  @IsEmail()
  email: string

  @IsNotEmpty({ message: 'Значение не должно быть пустым' })
  password: string
}

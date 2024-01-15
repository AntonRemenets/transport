import { IsEmail, IsNotEmpty } from 'class-validator'

export class RegisterDto {
  @IsNotEmpty({ message: 'Значение не должно быть пустым' })
  @IsEmail()
  email: string

  @IsNotEmpty({ message: 'Значение не должно быть пустым' })
  password: string
}

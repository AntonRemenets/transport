import { IsNotEmpty } from 'class-validator'

export class DeleteUserDto {
  @IsNotEmpty({ message: 'Значение не должно быть пустым' })
  id: string
}

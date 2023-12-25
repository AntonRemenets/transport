import { IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateDriverDto {
  @IsString({ message: 'Должно быть строкой' })
  lastName: string

  @IsString({ message: 'Должно быть строкой' })
  firstName: string

  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  patronymic?: string

  license: string
  
  @IsNumber()
  busesId: number
}

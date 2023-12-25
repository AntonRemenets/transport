import { IsNumber, IsString } from 'class-validator'

export class UpdateRouteDto {
  @IsString({ message: 'Должно быть строкой' })
  from: string

  @IsString({ message: 'Должно быть строкой' })
  to: string

  @IsNumber()
  distance: number
}

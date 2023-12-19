import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class UpdateRouteDto {
  @ApiProperty({ type: String })
  @IsString({ message: 'Должно быть строкой' })
  from: string

  @ApiProperty({ type: String })
  @IsString({ message: 'Должно быть строкой' })
  to: string

  @ApiProperty({ type: Number })
  @IsNumber()
  distance: number
}

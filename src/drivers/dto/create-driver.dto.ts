import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateDriverDto {
  @ApiProperty({ type: String })
  @IsString({ message: 'Должно быть строкой' })
  lastName: string

  @ApiProperty({ type: String })
  @IsString({ message: 'Должно быть строкой' })
  firstName: string

  @ApiProperty({ type: String, required: false })
  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  patronymic?: string

  @ApiProperty({ type: String })
  license: string

  @ApiProperty({ type: Number })
  @IsNumber()
  busesId: number
}

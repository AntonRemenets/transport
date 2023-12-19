import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString, Length } from 'class-validator'

export class CreateBusDto {
  @ApiProperty({ type: String })
  @IsString({ message: 'Должно быть строкой' })
  vehicle_number: string

  @ApiProperty({ type: String })
  @IsString({ message: 'Должно быть строкой' })
  @Length(17, 17, { message: 'Вин номер должен состоять из 17 символов' })
  vin: string

  @ApiProperty({ type: String })
  @IsString({ message: 'Должно быть строкой' })
  @Length(1, 1, { message: 'Категория должна содержать 1 букву' })
  category: string

  @ApiProperty({ type: String })
  brand: string

  @ApiProperty({ type: String })
  model: string

  @ApiProperty({ type: Number })
  @IsNumber()
  busRoutesId: number
}

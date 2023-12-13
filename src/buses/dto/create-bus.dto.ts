import { ApiProperty } from '@nestjs/swagger'

export class CreateBusDto {
  @ApiProperty({ type: String })
  vehicle_number: string

  @ApiProperty({ type: String })
  vin: string

  @ApiProperty({ type: String })
  category: string

  @ApiProperty({ type: String })
  brand: string

  @ApiProperty({ type: String })
  model: string

  @ApiProperty({ type: Number })
  busRoutesId: number
}

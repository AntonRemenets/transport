import { ApiProperty } from '@nestjs/swagger'

export class UpdateBusDto {
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

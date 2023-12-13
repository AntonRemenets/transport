import { ApiProperty } from '@nestjs/swagger'

export class Bus {
  @ApiProperty({ required: false })
  id: number

  @ApiProperty()
  vehicle_number: string

  @ApiProperty()
  vin: string

  @ApiProperty()
  category: string

  @ApiProperty()
  brand: string

  @ApiProperty()
  model: string

  @ApiProperty()
  busRoutesId: number
}

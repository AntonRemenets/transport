import { ApiProperty } from '@nestjs/swagger'

export class BusRoutesType {
  @ApiProperty()
  id: number

  @ApiProperty()
  title: string

  @ApiProperty()
  from: string

  @ApiProperty()
  to: string

  @ApiProperty()
  distance: number
}

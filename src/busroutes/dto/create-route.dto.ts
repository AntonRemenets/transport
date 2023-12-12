import { ApiProperty } from '@nestjs/swagger'

export class CreateRouteDto {
  @ApiProperty()
  title: string

  @ApiProperty()
  from: string

  @ApiProperty()
  to: string

  @ApiProperty()
  distance: number
}

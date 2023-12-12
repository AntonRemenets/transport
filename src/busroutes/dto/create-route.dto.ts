import { ApiProperty } from '@nestjs/swagger'

export class CreateRouteDto {
  @ApiProperty({ type: String })
  title: string

  @ApiProperty({ type: String })
  from: string

  @ApiProperty({ type: String })
  to: string

  @ApiProperty({ type: Number })
  distance: number
}

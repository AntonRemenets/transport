import { ApiProperty } from '@nestjs/swagger'

export class UpdateRouteDto {
  @ApiProperty({ type: String })
  from: string

  @ApiProperty({ type: String })
  to: string

  @ApiProperty({ type: Number })
  distance: number
}

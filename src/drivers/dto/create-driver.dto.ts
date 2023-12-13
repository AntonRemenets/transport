import { ApiProperty } from '@nestjs/swagger'

export class CreateDriverDto {
  @ApiProperty({ type: String })
  lastName: string

  @ApiProperty({ type: String })
  firstName: string

  @ApiProperty({ type: String, required: false })
  patronymic?: string

  @ApiProperty({ type: String })
  license: string

  @ApiProperty({ type: Number })
  busesId: number
}

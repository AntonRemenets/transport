import { ApiProperty } from '@nestjs/swagger'

export class Driver {
  @ApiProperty({ required: false })
  id: number

  @ApiProperty()
  lastName: string

  @ApiProperty()
  firstName: string

  @ApiProperty()
  patronymic?: string

  @ApiProperty()
  license: string

  @ApiProperty()
  busesId: number
}

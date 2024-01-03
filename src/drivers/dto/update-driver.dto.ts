import { IsNumber } from 'class-validator'
import { Field, InputType, PartialType } from '@nestjs/graphql'
import { CreateDriverDto } from './create-driver.dto'

@InputType()
export class UpdateDriverDto extends PartialType(CreateDriverDto) {
  @Field({ nullable: true })
  lastName: string

  @Field({ nullable: true })
  firstName: string

  @Field({ nullable: true })
  patronymic?: string

  @Field({ nullable: true })
  license: string

  @Field({ nullable: true })
  @IsNumber()
  busesId: number
}

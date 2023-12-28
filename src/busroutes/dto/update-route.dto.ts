import { IsNumber, IsString } from 'class-validator'
import { Field, Float, InputType, PartialType } from '@nestjs/graphql'
import { CreateRouteDto } from './create-route.dto'

@InputType()
export class UpdateRouteDto extends PartialType(CreateRouteDto) {
  @Field({ nullable: true })
  from?: string

  @Field({ nullable: true })
  to?: string

  @Field(() => Float, { nullable: true })
  @IsNumber()
  distance?: number
}

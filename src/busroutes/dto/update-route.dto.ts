import { IsNumber, IsPositive, Min } from 'class-validator'
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
  @Min(1, { message: 'Значение должно быть больше 1' })
  @IsPositive({ message: 'Значение должно быть положительным' })
  distance?: number
}

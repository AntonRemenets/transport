import { IsNumber, IsString } from 'class-validator'
import { Field, Float, InputType, PartialType } from '@nestjs/graphql'
import { CreateRouteDto } from './create-route.dto'

@InputType()
export class UpdateRouteDto extends PartialType(CreateRouteDto) {
  @Field({ nullable: true })
  @IsString({ message: 'Должно быть строкой' })
  from?: string

  @Field({ nullable: true })
  @IsString({ message: 'Должно быть строкой' })
  to?: string

  @Field(() => Float, { nullable: true })
  @IsNumber()
  distance?: number
}

import { IsNumber, IsString } from 'class-validator'
import { Field, Float, InputType } from '@nestjs/graphql'

@InputType()
export class CreateRouteDto {
  @Field()
  title: string

  @Field()
  @IsString({ message: 'Должно быть строкой' })
  from: string

  @Field()
  @IsString({ message: 'Должно быть строкой' })
  to: string

  @Field(() => Float)
  @IsNumber()
  distance: number
}

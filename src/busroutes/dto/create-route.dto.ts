import { IsNotEmpty, IsNumber, IsPositive, Min } from 'class-validator'
import { Field, Float, InputType } from '@nestjs/graphql'

@InputType()
export class CreateRouteDto {
  @Field()
  @IsNotEmpty({ message: 'Значение не должно быть пустым' })
  title: string

  @Field()
  @IsNotEmpty({ message: 'Значение не должно быть пустым' })
  from: string

  @Field()
  @IsNotEmpty({ message: 'Значение не должно быть пустым' })
  to: string

  @Field(() => Float)
  @IsNumber()
  @Min(1, { message: 'Значение должно быть больше 1' })
  @IsPositive({ message: 'Значение должно быть положительным' })
  distance: number
}

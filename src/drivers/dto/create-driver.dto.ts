import { IsNotEmpty, IsNumber, IsOptional, IsPositive } from 'class-validator'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateDriverDto {
  @Field()
  @IsNotEmpty({ message: 'Значение не должно быть пустым' })
  lastName: string

  @Field()
  @IsNotEmpty({ message: 'Значение не должно быть пустым' })
  firstName: string

  @Field()
  @IsOptional()
  patronymic?: string

  @Field()
  @IsNotEmpty({ message: 'Значение не должно быть пустым' })
  license: string

  @Field()
  @IsNotEmpty({ message: 'Значение не должно быть пустым' })
  @IsNumber()
  @IsPositive({ message: 'Значение должно быть корректным' })
  busesId: number
}

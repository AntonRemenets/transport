import { IsIn, IsNotEmpty, IsNumber, IsPositive, Length } from 'class-validator'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateBusDto {
  @Field()
  @IsNotEmpty({ message: 'Значение не должно быть пустым' })
  vehicle_number: string

  @Field()
  @IsNotEmpty({ message: 'Значение не должно быть пустым' })
  @Length(17, 17, { message: 'Вин номер должен состоять из 17 символов' })
  vin: string

  @Field()
  @IsNotEmpty({ message: 'Значение не должно быть пустым' })
  //@Length(1, 1, { message: 'Категория должна содержать 1 букву' })
  @IsIn(['A', 'B', 'C', 'D'], {
    message: 'Катеогрия должно принимать одно из следующих значений A B C D',
  })
  category: string

  @Field()
  @IsNotEmpty({ message: 'Значение не должно быть пустым' })
  brand: string

  @Field()
  @IsNotEmpty({ message: 'Значение не должно быть пустым' })
  model: string

  @Field()
  @IsPositive({ message: 'Значение должно быть положительным' })
  @IsNumber()
  busRoutesId: number

  @Field({ nullable: true })
  @IsNumber()
  @IsPositive({ message: 'Значение должно быть положительным' })
  driverId?: number
}

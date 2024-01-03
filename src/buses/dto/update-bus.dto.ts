import { IsIn, IsNumber, IsPositive, Length } from 'class-validator'
import { Field, InputType, PartialType } from '@nestjs/graphql'
import { CreateBusDto } from './create-bus.dto'

@InputType()
export class UpdateBusDto extends PartialType(CreateBusDto) {
  @Field({ nullable: true })
  @Length(17, 17, { message: 'Вин номер должен состоять из 17 символов' })
  vin?: string

  @Field({ nullable: true })
  vehicle_number?: string

  @Field({ nullable: true })
  @IsIn(['A', 'B', 'C', 'D'], {
    message: 'Катеогрия должно принимать одно из следующих значений A B C D',
  })
  category?: string

  @Field({ nullable: true })
  brand?: string

  @Field({ nullable: true })
  model?: string

  @Field({ nullable: true })
  @IsNumber()
  @IsPositive({ message: 'Значение должно быть положительным' })
  busRoutesId?: number
}

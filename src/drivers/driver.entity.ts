import { Field, ID, ObjectType } from '@nestjs/graphql'
import { BusType } from '../buses/bus.entity'

@ObjectType({ description: 'Drivers model' })
export class DriverType {
  @Field(() => ID)
  id: number

  @Field()
  lastName: string

  @Field()
  firstName: string

  @Field({ nullable: true })
  patronymic?: string

  @Field()
  license: string

  @Field(() => [BusType])
  buses: BusType[]
}

import { Field, Float, ID, ObjectType } from '@nestjs/graphql'
import { BusType } from '../buses/bus.entity'

@ObjectType({ description: 'Bus Routes model' })
export class BusRoutesType {
  @Field(() => ID)
  id: number

  @Field()
  title: string

  @Field()
  from: string

  @Field()
  to: string

  @Field(() => Float)
  distance: number

  @Field(() => [BusType])
  buses: BusType[]
}

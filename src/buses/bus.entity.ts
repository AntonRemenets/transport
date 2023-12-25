import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType({ description: 'Bus model' })
export class Bus {
  @Field(() => ID)
  id: number

  @Field()
  vehicle_number: string

  @Field()
  vin: string

  @Field()
  category: string

  @Field()
  brand: string

  @Field()
  model: string

  @Field()
  busRoutesId: number
}

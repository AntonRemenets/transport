import { Field, ID, ObjectType } from '@nestjs/graphql'
import { DriverType } from '../drivers/driver.entity'

@ObjectType({ description: 'Bus model' })
export class BusType {
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

  @Field(() => [DriverType])
  drivers: DriverType[]
}

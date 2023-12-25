import { Field, Float, ID, ObjectType } from '@nestjs/graphql'

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
}

import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType({ description: 'Drivers model' })
export class Driver {
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

  @Field()
  busesId: number
}

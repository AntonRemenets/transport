import { Resolver, Query } from '@nestjs/graphql'

@Resolver()
export class BusRoutesResolver {
  @Query(() => String)
  async Hello() {
    return 'Hello from Nest!'
  }
}

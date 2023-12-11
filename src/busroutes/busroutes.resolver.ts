import { Resolver, Query } from '@nestjs/graphql'
import { BusRoutesService } from './busroutes.service'

@Resolver()
export class BusRoutesResolver {

  constructor(private readonly busRouterService: BusRoutesService) { }

  @Query(() => String)
  async Hello() {
    return 'Hello from Nest!'
  }

}

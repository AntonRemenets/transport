import { Resolver, Query, Args } from '@nestjs/graphql'
import { BusRoutesType } from './busroute.entity'
import { BusRoutesService } from './busroutes.service'
import { ParseIntPipe } from '@nestjs/common'

@Resolver('BusRoutes')
export class BusRoutesResolver {
  constructor(private readonly busRoutesServices: BusRoutesService) {}

  //GetAll
  @Query(() => [BusRoutesType], { name: 'BusRoutes' })
  async getAllRoutes() {
    return this.busRoutesServices.getAll()
  }
}

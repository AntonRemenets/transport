import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { BusRoutesType } from './busroute.entity'
import { BusRoutesService } from './busroutes.service'
import { CreateRouteDto } from './dto/create-route.dto'
import { ParseIntPipe } from '@nestjs/common'
import { UpdateRouteDto } from './dto/update-route.dto'

@Resolver('BusRoutes')
export class BusRoutesResolver {
  constructor(private readonly busRoutesServices: BusRoutesService) {}

  //GetAll
  @Query(() => [BusRoutesType], { name: 'BusRoutes' })
  async getAllRoutes() {
    return await this.busRoutesServices.getAll()
  }

  //Create
  @Mutation(() => BusRoutesType, { name: 'createRoute' })
  async createRoute(
    @Args('createRouteInput') createRouteInput: CreateRouteDto,
  ) {
    return await this.busRoutesServices.createRoute(createRouteInput)
  }

  //Update
  @Mutation(() => BusRoutesType, { name: 'updateRoute' })
  async updateRoute(
    @Args('id', ParseIntPipe) id: number,
    @Args('updateRouteInput') updateRouteInput: UpdateRouteDto,
  ) {
    return await this.busRoutesServices.updateRoute(id, updateRouteInput)
  }

  //Delete
  @Mutation(() => BusRoutesType, { name: 'deleteRoute' })
  async deleteRoute(@Args('id', ParseIntPipe) id: number) {
    return await this.busRoutesServices.deleteRoute(id)
  }
}

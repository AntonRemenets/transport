import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { BusesService } from './buses.service'
import { BusType } from './bus.entity'
import { ParseIntPipe, UseGuards } from '@nestjs/common'
import { CreateBusDto } from './dto/create-bus.dto'
import { UpdateBusDto } from './dto/update-bus.dto'
import { GqlJwtAuthGuard } from '../guards/gql.guards'
import { Roles } from '../decorators/roles.decorator'
import { Role } from '../users/entities/user.entity'

@UseGuards(GqlJwtAuthGuard)
@Roles(Role.USER)
@Resolver('Buses')
export class BusesResolver {
  constructor(private readonly busService: BusesService) {}

  //GetAll
  @Query(() => [BusType], { name: 'Buses' })
  async getAll() {
    return this.busService.findAll()
  }

  //GetOne
  @Query(() => BusType, { name: 'GetBusById' })
  async getOneBus(@Args('id', ParseIntPipe) id: number) {
    return this.busService.findOne(id)
  }

  //Create
  @Mutation(() => BusType, { name: 'CreateBus' })
  async createBus(@Args('createBusInput') createBusInput: CreateBusDto) {
    return await this.busService.create(createBusInput)
  }

  //Update
  @Mutation(() => BusType, { name: 'UpdateBus' })
  async updateBus(@Args('id', ParseIntPipe) id: number, @Args('updateBusInput') updateBusInput: UpdateBusDto) {
    return await this.busService.update(id, updateBusInput)
  }

  //Delete
  @Mutation(() => BusType, { name: 'DeleteBus' })
  async deleteBus(@Args('id', ParseIntPipe) id: number) {
    return await this.busService.remove(id)
  }
}

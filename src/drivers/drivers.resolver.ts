import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { DriverType } from './driver.entity'
import { DriversService } from './drivers.service'
import { ParseIntPipe } from '@nestjs/common'
import { CreateDriverDto } from './dto/create-driver.dto'
import { UpdateDriverDto } from './dto/update-driver.dto'

@Resolver('Drivers')
export class DriversResolver {
  constructor(private readonly driversService: DriversService) {}

  //GetALl
  @Query(() => [DriverType], { name: 'GetAllDrivers' })
  async getDrivers() {
    return await this.driversService.findAll()
  }

  //GetOne
  @Query(() => DriverType, { name: 'GetOneDriver' })
  async getOneDriver(@Args('id', ParseIntPipe) id: number) {
    return await this.driversService.findOne(id)
  }

  //Create
  @Mutation(() => DriverType, { name: 'CreateDriver' })
  async createDriver(
    @Args('createDriverInput') createDriverInput: CreateDriverDto,
  ) {
    return await this.driversService.create(createDriverInput)
  }

  //Update
  @Mutation(() => DriverType, { name: 'UpdateDriver' })
  async updateDriver(
    @Args('id', ParseIntPipe) id: number,
    @Args('updateDriverInput') updateDriverInput: UpdateDriverDto,
  ) {
    return await this.driversService.update(id, updateDriverInput)
  }

  //Delete
  @Mutation(() => DriverType, { name: 'DeleteDriver' })
  async deleteDriver(@Args('id', ParseIntPipe) id: number) {
    return await this.driversService.remove(id)
  }
}

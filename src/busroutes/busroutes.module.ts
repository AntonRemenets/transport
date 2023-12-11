import { Module } from '@nestjs/common'
import { BusRoutesService } from './busroutes.service'
import { BusRoutesResolver } from './busroutes.resolver'

@Module({
  providers: [BusRoutesService, BusRoutesResolver],
})
export class BusRoutesModule {}

import { Module } from '@nestjs/common'
import { BusesService } from './buses.service'
import { PrismaService } from '../prisma/prisma.service'
import { BusesResolver } from './buses.resolver'

@Module({
  controllers: [],
  providers: [BusesService, PrismaService, BusesResolver],
})
export class BusesModule {}

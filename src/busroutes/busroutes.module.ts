import { Module } from '@nestjs/common'
import { BusRoutesService } from './busroutes.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { BusRoutesResolver } from './busroutes.resolver'

@Module({
  imports: [],
  providers: [BusRoutesService, PrismaService, BusRoutesResolver],
  controllers: [],
})
export class BusRoutesModule {}

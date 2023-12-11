import { Module } from '@nestjs/common'
import { BusRoutesService } from './busroutes.service'
import { BusRoutesResolver } from './busroutes.resolver'
import { PrismaService } from 'src/prisma/prisma.service'

@Module({
  imports: [],
  providers: [BusRoutesService, BusRoutesResolver, PrismaService],
})
export class BusRoutesModule { }

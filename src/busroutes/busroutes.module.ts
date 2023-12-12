import { Module } from '@nestjs/common'
import { BusRoutesService } from './busroutes.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { BusRoutesController } from './busroutes.controller'

@Module({
  imports: [],
  providers: [BusRoutesService, PrismaService],
  controllers: [BusRoutesController],
})
export class BusRoutesModule {}

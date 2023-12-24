import { Module } from '@nestjs/common'
import { BusesService } from './buses.service'
import { PrismaService } from '../prisma/prisma.service'

@Module({
  controllers: [],
  providers: [BusesService, PrismaService],
})
export class BusesModule {}

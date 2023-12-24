import { Module } from '@nestjs/common'
import { BusRoutesService } from './busroutes.service'
import { PrismaService } from 'src/prisma/prisma.service'

@Module({
  imports: [],
  providers: [BusRoutesService, PrismaService],
  controllers: [],
})
export class BusRoutesModule {}

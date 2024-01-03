import { Module } from '@nestjs/common'
import { DriversService } from './drivers.service'
import { PrismaService } from '../prisma/prisma.service'
import { DriversResolver } from './drivers.resolver'

@Module({
  controllers: [],
  providers: [DriversService, PrismaService, DriversResolver],
})
export class DriversModule {}

import { Module } from '@nestjs/common'
import { DriversService } from './drivers.service'
import { PrismaService } from '../prisma/prisma.service'

@Module({
  controllers: [],
  providers: [DriversService, PrismaService],
})
export class DriversModule {}

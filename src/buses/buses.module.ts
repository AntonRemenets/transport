import { Module } from '@nestjs/common'
import { BusesService } from './buses.service'
import { PrismaService } from '../prisma/prisma.service'
import { BusesResolver } from './buses.resolver'
import { AuthModule } from '../auth/auth.module'
import { PassportModule } from '@nestjs/passport'

@Module({
  imports: [AuthModule, PassportModule],
  controllers: [],
  providers: [BusesService, PrismaService, BusesResolver],
})
export class BusesModule {}

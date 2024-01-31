import { Module } from '@nestjs/common'
import { BusRoutesService } from './busroutes.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { BusRoutesResolver } from './busroutes.resolver'
import { AuthModule } from '../auth/auth.module'
import { PassportModule } from '@nestjs/passport'

@Module({
  imports: [AuthModule, PassportModule],
  providers: [BusRoutesService, PrismaService, BusRoutesResolver],
  controllers: [],
})
export class BusRoutesModule {}

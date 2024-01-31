import { Module } from '@nestjs/common'
import { DriversService } from './drivers.service'
import { PrismaService } from '../prisma/prisma.service'
import { DriversResolver } from './drivers.resolver'
import { AuthModule } from '../auth/auth.module'
import { PassportModule } from '@nestjs/passport'

@Module({
  imports: [AuthModule, PassportModule],
  controllers: [],
  providers: [DriversService, PrismaService, DriversResolver],
})
export class DriversModule {}

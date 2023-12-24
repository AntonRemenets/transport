import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { BusRoutesModule } from './busroutes/busroutes.module'
import { BusesModule } from './buses/buses.module'
import { DriversModule } from './drivers/drivers.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BusRoutesModule,
    BusesModule,
    DriversModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}

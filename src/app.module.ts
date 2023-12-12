import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { BusRoutesModule } from './busroutes/busroutes.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BusRoutesModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}

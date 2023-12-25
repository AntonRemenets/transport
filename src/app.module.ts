import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { BusRoutesModule } from './busroutes/busroutes.module'
import { BusesModule } from './buses/buses.module'
import { DriversModule } from './drivers/drivers.module'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
    }),
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

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from 'src/infrastructure/entities/client/Client.entity';
import { DatabaseService } from './database.service';
import { EnvironmentConfigModule } from '../environment/environment-config.module';
import { EnvironmentConfigService } from '../environment/environment-config.service';

@Module({
  imports: [
    EnvironmentConfigModule,
    MongooseModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: (config: EnvironmentConfigService) => ({
        uri: config.connectionString,
      }),
    }),
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
    DatabaseModule,
  ],
  providers: [DatabaseService],
})
export class DatabaseModule {}

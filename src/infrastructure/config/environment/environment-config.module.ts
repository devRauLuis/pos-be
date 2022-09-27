import { Module } from '@nestjs/common';
import { EnvironmentConfigService } from './environment-config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  exports: [EnvironmentConfigService],
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [EnvironmentConfigService],
})
export class EnvironmentConfigModule {}

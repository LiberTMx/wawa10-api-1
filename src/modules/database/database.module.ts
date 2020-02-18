import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { ConfigurationModule } from '../configuration/configuration.module';

@Module({
  imports: [
    ConfigurationModule,
  ],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}

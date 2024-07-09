import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { settingsProviders } from './settings.providers';
import { SettingsController } from './settings.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [SettingsController],
  providers: [SettingsService, ...settingsProviders],
})
export class SettingsModule {}

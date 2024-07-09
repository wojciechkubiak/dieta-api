import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlansModule } from './plans/plans.module';
import { MeasuresModule } from './measures/measures.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { DaysModule } from './days/days.module';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    AuthModule,
    DatabaseModule,
    PlansModule,
    MeasuresModule,
    DaysModule,
    SettingsModule,
  ],
})
export class AppModule {}

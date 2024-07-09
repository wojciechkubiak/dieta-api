import { DaysService } from './days.service';
import { DaysController } from './days.controller';
import { Module } from '@nestjs/common';
import { daysProviders } from './days.providers';
import { DatabaseModule } from 'src/database/database.module';
import { plansProviders } from 'src/plans/plans.providers';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [DaysController],
  providers: [DaysService, ...plansProviders, ...daysProviders],
})
export class DaysModule {}

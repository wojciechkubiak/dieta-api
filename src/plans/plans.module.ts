import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { plansProviders } from './plans.providers';

import { PlansService } from './plans.service';
import { PlansController } from './plans.controller';
import { AuthModule } from '../auth/auth.module';
import { daysProviders } from 'src/days/days.providers';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [PlansController],
  providers: [...plansProviders, ...daysProviders, PlansService],
})
export class PlansModule {}

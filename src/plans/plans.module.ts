import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { plansProviders } from './plans.providers';

import { PlansService } from './plans.service';
import { PlansController } from './plans.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [PlansController],
  providers: [...plansProviders, PlansService],
})
export class PlansModule {}

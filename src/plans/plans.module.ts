import { Module } from '@nestjs/common';
import { PlansController } from './plans.controller';
import { PlansService } from './plans.service';
import { DatabaseModule } from 'src/database/database.module';
import { planProviders } from './plan.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [PlansController],
  providers: [...planProviders, PlansService],
})
export class PlansModule {}

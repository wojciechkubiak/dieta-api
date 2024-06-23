import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { planProviders } from './common.providers';
import { PlanNameService } from './name/name.service';
import { PlanStatusService } from './status/status.service';
import { PlanService } from './plan/plan.service';
import { PlanNameController } from './name/name.controller';
import { PlanController } from './plan/plan.controller';
import { PlanStatusController } from './status/status.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [PlanController, PlanNameController, PlanStatusController],
  providers: [
    ...planProviders,
    PlanService,
    PlanNameService,
    PlanStatusService,
  ],
})
export class PlansModule {}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { PlanStatus } from '../plan.enum';

export class UpdatePlanStatusDto {
  @ApiProperty()
  @IsNotEmpty()
  status: PlanStatus;
}

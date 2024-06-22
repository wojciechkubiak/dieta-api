import { Controller, Get, Param } from '@nestjs/common';
import Plan from './plan.model';
import { PlansService } from './plans.service';

@Controller('plans')
export class PlansController {
  constructor(private plansService: PlansService) {}

  @Get('/:userId')
  getTasksByUserId(@Param('userId') userId: string): Plan[] {
    return this.plansService.getTasksByUserId(userId);
  }
}

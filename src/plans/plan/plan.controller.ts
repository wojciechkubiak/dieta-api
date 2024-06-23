import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Plan } from '../common.entity';
import { PlanService } from './plan.service';

@ApiTags('plans')
@Controller('plans')
export class PlanController {
  constructor(private planService: PlanService) {}

  @Get('/:userId')
  @ApiOperation({
    summary: 'Get all plans for specific user',
  })
  @ApiResponse({
    status: 200,
    type: [Plan],
  })
  getPlansByUserId(@Param('userId') userId: string) {
    return this.planService.getPlansByUserId(userId);
  }

  @Post(':userId')
  @ApiOperation({ summary: 'Create empty plan' })
  @ApiResponse({
    status: 200,
    type: Plan,
  })
  createPlan(
    @Param('userId') userId: string,
    @Body() createPlanDto: CreatePlanDto,
  ) {
    return this.planService.createEmptyPlan(userId, createPlanDto);
  }

  @Get('/:userId/:id')
  @ApiOperation({
    summary: 'Search for a plan of specific user',
  })
  @ApiResponse({
    status: 200,
    type: Plan,
  })
  getPlanById(@Param('userId') userId: string, @Param('id') id: string) {
    return this.planService.getPlanById(userId, id);
  }
}

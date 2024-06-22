import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PlansService } from './plans.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import {
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Plan } from './plan.entity';
import { UpdatePlanStatusDto } from './dto/update-plan-status.dto';
import { UpdatePlanNameDto } from './dto/update-plan-name.dto';
import { PlanStatus } from './plan.enum';
import {
  CREATED_RECORD,
  CREATE_EMPTY_PLAN_SUMMARY,
  FORBIDDEN,
  FOUND_RECORD,
  GET_PLANS_BY_USER_ID_SUMMMARY,
  GET_PLAN_BY_ID_SUMMARY,
  GET_USER_PLANS_BY_STATUS_SUMMARY,
  MISSING_NAME_FIELD,
  MISSING_STATUS_FIELD,
  PLANS_NOT_FOUND,
  PLAN_CHANGES_NOT_SAVED,
  PLAN_NOT_FOUND,
  UPDATED_RECORD,
  UPDATE_PLAN_NAME_SUMMARY,
  UPDATE_PLAN_STATUS_SUMMARY,
} from './consts';

@ApiTags('plans')
@Controller('plans')
export class PlansController {
  constructor(private plansService: PlansService) {}

  @Get('/:userId')
  @ApiOperation(GET_PLANS_BY_USER_ID_SUMMMARY)
  @ApiResponse({
    status: 200,
    type: [Plan],
  })
  @ApiNotFoundResponse(PLANS_NOT_FOUND)
  getPlansByUserId(@Param('userId') userId: string) {
    return this.plansService.getPlansByUserId(userId);
  }

  @Get('/:userId/:status')
  @ApiOperation(GET_USER_PLANS_BY_STATUS_SUMMARY)
  @ApiResponse({
    status: 200,
    type: [Plan],
  })
  @ApiNotFoundResponse(PLANS_NOT_FOUND)
  getUserPlansByStatus(
    @Param('userId') userId: string,
    @Param('status') status: PlanStatus,
  ) {
    return this.plansService.getUserPlansByStatus(userId, status);
  }

  @Post(':userId')
  @ApiOperation(CREATE_EMPTY_PLAN_SUMMARY)
  @ApiResponse({ ...CREATED_RECORD, type: Plan })
  @ApiResponse(FORBIDDEN)
  @ApiNotFoundResponse(PLAN_CHANGES_NOT_SAVED)
  createPlan(
    @Param('userId') userId: string,
    @Body() createPlanDto: CreatePlanDto,
  ) {
    return this.plansService.createEmptyPlan(userId, createPlanDto);
  }

  @Get('/:userId/:id')
  @ApiOperation(GET_PLAN_BY_ID_SUMMARY)
  @ApiResponse({ ...FOUND_RECORD, type: Plan })
  @ApiNotFoundResponse(PLAN_NOT_FOUND)
  getPlanById(@Param('userId') userId: string, @Param('id') id: string) {
    return this.plansService.getPlanById(userId, id);
  }

  @Put(':userId/:id/status')
  @ApiOperation(UPDATE_PLAN_STATUS_SUMMARY)
  @ApiResponse({ ...UPDATED_RECORD, type: Plan })
  @ApiNotFoundResponse(MISSING_STATUS_FIELD)
  @ApiResponse(FORBIDDEN)
  @ApiResponse(PLAN_NOT_FOUND)
  updatePlanStatus(
    @Param('userId') userId: string,
    @Param('id') id: string,
    @Body() updatePlanStatusDto: UpdatePlanStatusDto,
  ) {
    return this.plansService.updatePlanStatus(userId, id, updatePlanStatusDto);
  }

  @Put(':userId/:id/name')
  @ApiOperation(UPDATE_PLAN_NAME_SUMMARY)
  @ApiResponse({ ...UPDATED_RECORD, type: Plan })
  @ApiNotFoundResponse(MISSING_NAME_FIELD)
  @ApiResponse(FORBIDDEN)
  @ApiResponse(PLAN_NOT_FOUND)
  updatePlanName(
    @Param('userId') userId: string,
    @Param('id') id: string,
    @Body() updatePlanNameDto: UpdatePlanNameDto,
  ) {
    return this.plansService.updatePlanName(userId, id, updatePlanNameDto);
  }
}

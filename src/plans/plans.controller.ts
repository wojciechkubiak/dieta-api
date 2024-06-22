import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PlansService } from './plans.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import {
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdatePlanStatusDto } from './dto/update-plan-status.dto';
import { UpdatePlanNameDto } from './dto/update-plan-name.dto';
import { PlanStatus } from './plan.enum';
import {
  API_RESPONSE_CREATED,
  API_OPERATION_CREATE_EMPTY_PLAN,
  API_RESPONSE_FORBIDDEN,
  API_RESPONSE_SUCCESS_LIST,
  API_RESPONSE_FOUND,
  API_OPERATION_GET_PLANS_BY_USER_ID,
  API_OPERATION_GET_PLAN_BY_ID,
  API_OPERATION_GET_USER_PLANS_BY_STATUS,
  API_NOT_FOUND_NAME_FIELD,
  API_NOT_FOUND_STATUS_FIELD,
  API_RESPONSE_NOT_FOUND_PLANS,
  API_NOT_FOUND_PLAN_NOT_SAVED,
  API_RESPONSE_NOT_FOUND_PLAN,
  API_RESPONSE_UPDATED,
  API_OPERATION_UPDATE_PLAN_NAME,
  API_OPERATION_UPDATE_PLAN_STATUS,
} from './consts';

@ApiTags('plans')
@Controller('plans')
export class PlansController {
  constructor(private plansService: PlansService) {}

  @Get('/:userId')
  @ApiOperation(API_OPERATION_GET_PLANS_BY_USER_ID)
  @ApiResponse(API_RESPONSE_SUCCESS_LIST)
  @ApiNotFoundResponse(API_RESPONSE_NOT_FOUND_PLANS)
  getPlansByUserId(@Param('userId') userId: string) {
    return this.plansService.getPlansByUserId(userId);
  }

  @Get('/:userId/:status')
  @ApiOperation(API_OPERATION_GET_USER_PLANS_BY_STATUS)
  @ApiResponse(API_RESPONSE_SUCCESS_LIST)
  @ApiNotFoundResponse(API_RESPONSE_NOT_FOUND_PLANS)
  getUserPlansByStatus(
    @Param('userId') userId: string,
    @Param('status') status: PlanStatus,
  ) {
    return this.plansService.getUserPlansByStatus(userId, status);
  }

  @Post(':userId')
  @ApiOperation(API_OPERATION_CREATE_EMPTY_PLAN)
  @ApiResponse(API_RESPONSE_CREATED)
  @ApiResponse(API_RESPONSE_FORBIDDEN)
  @ApiNotFoundResponse(API_NOT_FOUND_PLAN_NOT_SAVED)
  createPlan(
    @Param('userId') userId: string,
    @Body() createPlanDto: CreatePlanDto,
  ) {
    return this.plansService.createEmptyPlan(userId, createPlanDto);
  }

  @Get('/:userId/:id')
  @ApiOperation(API_OPERATION_GET_PLAN_BY_ID)
  @ApiResponse(API_RESPONSE_FOUND)
  @ApiNotFoundResponse(API_RESPONSE_NOT_FOUND_PLAN)
  getPlanById(@Param('userId') userId: string, @Param('id') id: string) {
    return this.plansService.getPlanById(userId, id);
  }

  @Put(':userId/:id/status')
  @ApiOperation(API_OPERATION_UPDATE_PLAN_STATUS)
  @ApiResponse(API_RESPONSE_UPDATED)
  @ApiNotFoundResponse(API_NOT_FOUND_STATUS_FIELD)
  @ApiResponse(API_RESPONSE_FORBIDDEN)
  @ApiResponse(API_RESPONSE_NOT_FOUND_PLAN)
  updatePlanStatus(
    @Param('userId') userId: string,
    @Param('id') id: string,
    @Body() updatePlanStatusDto: UpdatePlanStatusDto,
  ) {
    return this.plansService.updatePlanStatus(userId, id, updatePlanStatusDto);
  }

  @Put(':userId/:id/name')
  @ApiOperation(API_OPERATION_UPDATE_PLAN_NAME)
  @ApiResponse(API_RESPONSE_UPDATED)
  @ApiNotFoundResponse(API_NOT_FOUND_NAME_FIELD)
  @ApiResponse(API_RESPONSE_FORBIDDEN)
  @ApiResponse(API_RESPONSE_NOT_FOUND_PLAN)
  updatePlanName(
    @Param('userId') userId: string,
    @Param('id') id: string,
    @Body() updatePlanNameDto: UpdatePlanNameDto,
  ) {
    return this.plansService.updatePlanName(userId, id, updatePlanNameDto);
  }
}

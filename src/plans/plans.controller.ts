import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PlansService } from './plans.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import {
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdatePlanStatusDto } from './dto/update-plan-status.dto';
import { UpdatePlanNameDto } from './dto/update-plan-name.dto';
import { PlanStatus } from './plan.enum';
import { Plan } from './plan.entity';

@ApiTags('plans')
@Controller('plans')
export class PlansController {
  constructor(private plansService: PlansService) {}

  @Get('/:userId')
  @ApiOperation({
    summary: 'Get all plans for specific user',
  })
  @ApiResponse({
    status: 200,
    type: [Plan],
  })
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  getPlansByUserId(@Param('userId') userId: string) {
    return this.plansService.getPlansByUserId(userId);
  }

  @Post(':userId')
  @ApiOperation({ summary: 'Create empty plan' })
  @ApiResponse({
    status: 200,
    type: Plan,
  })
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  createPlan(
    @Param('userId') userId: string,
    @Body() createPlanDto: CreatePlanDto,
  ) {
    return this.plansService.createEmptyPlan(userId, createPlanDto);
  }

  @Get('/:userId/:id')
  @ApiOperation({
    summary: 'Search for a plan of specific user',
  })
  @ApiResponse({
    status: 200,
    type: Plan,
  })
  @ApiNotFoundResponse()
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  getPlanById(@Param('userId') userId: string, @Param('id') id: string) {
    return this.plansService.getPlanById(userId, id);
  }

  @Get('/:userId/:status')
  @ApiOperation({
    summary: 'Get all plans for specific user for defined status',
  })
  @ApiResponse({
    status: 200,
    type: [Plan],
  })
  @ApiNotFoundResponse()
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  getUserPlansByStatus(
    @Param('userId') userId: string,
    @Param('status') status: PlanStatus,
  ) {
    return this.plansService.getUserPlansByStatus(userId, status);
  }

  @Put(':userId/:id/name')
  @ApiOperation({ summary: 'Update plan name' })
  @ApiResponse({
    status: 200,
    type: Plan,
  })
  @ApiNotFoundResponse()
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  updatePlanName(
    @Param('userId') userId: string,
    @Param('id') id: string,
    @Body() updatePlanNameDto: UpdatePlanNameDto,
  ) {
    return this.plansService.updatePlanName(userId, id, updatePlanNameDto);
  }

  @Put(':userId/:id/status')
  @ApiOperation({
    summary: 'Update plan status',
  })
  @ApiResponse({
    status: 200,
    type: Plan,
  })
  @ApiNotFoundResponse()
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  updatePlanStatus(
    @Param('userId') userId: string,
    @Param('id') id: string,
    @Body() updatePlanStatusDto: UpdatePlanStatusDto,
  ) {
    return this.plansService.updatePlanStatus(userId, id, updatePlanStatusDto);
  }
}

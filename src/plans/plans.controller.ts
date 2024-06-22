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

@ApiTags('plans')
@Controller('plans')
export class PlansController {
  constructor(private plansService: PlansService) {}

  @Get('/:userId')
  @ApiOperation({ summary: 'Get all plans for specific user' })
  @ApiResponse({
    status: 200,
    type: [Plan],
  })
  @ApiNotFoundResponse({
    schema: {
      type: 'object',
      example: {
        message:
          'Plans of user with id: 821f826d-4894-403d-baec-f4f362a3749 not found',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  getPlansByUserId(@Param('userId') userId: string) {
    return this.plansService.getPlansByUserId(userId);
  }

  @Get('/:userId/:status')
  @ApiOperation({
    summary: 'Get all plans for specific user for defined status',
  })
  @ApiResponse({
    status: 200,
    type: [Plan],
  })
  @ApiNotFoundResponse({
    schema: {
      type: 'object',
      example: {
        message:
          'Plans of user with id: 821f826d-4894-403d-baec-f4f362a3749 not found',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  getUserPlansWithStatus(
    @Param('userId') userId: string,
    @Param('status') status: PlanStatus,
  ) {
    return this.plansService.getUserPlansWithStatus(userId, status);
  }

  @Post(':userId')
  @ApiOperation({ summary: 'Create empty plan' })
  @ApiResponse({ status: 200, description: 'Created record', type: Plan })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiNotFoundResponse({
    schema: {
      type: 'object',
      example: {
        message:
          'Plan for the user: 821f826d-4894-403d-baec-f4f362a3749 not saved',
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  createPlan(
    @Param('userId') userId: string,
    @Body() createPlanDto: CreatePlanDto,
  ) {
    return this.plansService.createEmptyPlan(userId, createPlanDto);
  }

  @Get('/:userId/:id')
  @ApiOperation({ summary: 'Search for a plan of specific user' })
  @ApiResponse({ status: 200, description: 'Found record', type: Plan })
  @ApiNotFoundResponse({
    schema: {
      type: 'object',
      example: {
        message:
          'Plan: 6b6a52f8-e0c4-4bbb-9f08-e237f49b4432 not found for the user: 821f826d-4894-403d-baec-f4f362a37493',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  getPlanById(@Param('userId') userId: string, @Param('id') id: string) {
    return this.plansService.getPlanById(userId, id);
  }

  @Put(':userId/:id/status')
  @ApiOperation({ summary: 'Update plan status' })
  @ApiResponse({ status: 200, description: 'Updated record', type: Plan })
  @ApiNotFoundResponse({
    schema: {
      type: 'object',
      example: {
        message: 'status should not be empty',
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({
    schema: {
      type: 'object',
      example: {
        message:
          'Plan: 1721d2a4-343d-4955-9855-2d4a22c63679 not found for the user: 821f826d-4894-403d-baec-f4f362a37493',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  updatePlanStatus(
    @Param('userId') userId: string,
    @Param('id') id: string,
    @Body() updatePlanStatusDto: UpdatePlanStatusDto,
  ) {
    return this.plansService.updatePlanStatus(userId, id, updatePlanStatusDto);
  }

  @Put(':userId/:id/name')
  @ApiOperation({ summary: 'Update plan name' })
  @ApiResponse({ status: 200, description: 'Updated record', type: Plan })
  @ApiNotFoundResponse({
    schema: {
      type: 'object',
      example: {
        message: 'name should not be empty',
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({
    schema: {
      type: 'object',
      example: {
        message:
          'Plan: 1721d2a4-343d-4955-9855-2d4a22c63679 not found for the user: 821f826d-4894-403d-baec-f4f362a37493',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  updatePlanName(
    @Param('userId') userId: string,
    @Param('id') id: string,
    @Body() updatePlanNameDto: UpdatePlanNameDto,
  ) {
    return this.plansService.updatePlanName(userId, id, updatePlanNameDto);
  }
}

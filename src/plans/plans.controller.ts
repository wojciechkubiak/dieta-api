import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreatePlanDto } from './dto/create.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Plan } from './plan.entity';
import { PlansService } from './plans.service';
import { UpdateNameDto, UpdateStatusDto } from './dto/update.dto';
import { FilterStatusDto } from './dto/filter.dto';

@ApiTags('plans')
@Controller('plans')
export class PlansController {
  constructor(private plansService: PlansService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all plans for specific user',
  })
  @ApiResponse({
    status: 200,
    type: [Plan],
  })
  getAll() {
    return this.plansService.getAll();
  }

  @Get('filter')
  @ApiOperation({
    summary: 'Get all plans for specific user for given status',
  })
  @ApiResponse({
    status: 200,
    type: Plan,
  })
  getByStatus(@Query() query: FilterStatusDto) {
    return this.plansService.getByStatus(query);
  }

  @Get(':planId')
  @ApiOperation({
    summary: 'Search for a plan of specific user',
  })
  @ApiResponse({
    status: 200,
    type: Plan,
  })
  getById(@Param('planId') planId: string) {
    return this.plansService.getById(planId);
  }

  @Post()
  @ApiOperation({ summary: 'Create empty plan' })
  @ApiResponse({
    status: 200,
    type: Plan,
  })
  create(@Body() createPlanDto: CreatePlanDto) {
    return this.plansService.create(createPlanDto);
  }

  @Put(':id/name')
  @ApiOperation({ summary: 'Update plan name' })
  @ApiResponse({
    status: 200,
    type: Plan,
  })
  updateName(@Param('id') id: string, @Body() updateNameDto: UpdateNameDto) {
    return this.plansService.updateName(id, updateNameDto);
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Update plan status' })
  @ApiResponse({
    status: 200,
    type: Plan,
  })
  updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    return this.plansService.updateStatus(id, updateStatusDto);
  }
}

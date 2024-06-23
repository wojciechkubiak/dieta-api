import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdatePlanStatusDto } from './dto/update-plan-status.dto';
import { PlanStatus } from '../common.enum';
import { Plan } from '../common.entity';
import { PlanStatusService } from './status.service';

@ApiTags('plans')
@Controller('plans')
export class PlanStatusController {
  constructor(private planStatusService: PlanStatusService) {}

  @Get('/:userId/:status')
  @ApiOperation({
    summary: 'Get all plans for specific user for defined status',
  })
  @ApiResponse({
    status: 200,
    type: [Plan],
  })
  getUserPlansByStatus(
    @Param('userId') userId: string,
    @Param('status') status: PlanStatus,
  ) {
    return this.planStatusService.getUserPlansByStatus(userId, status);
  }

  @Put(':userId/:id/status')
  @ApiOperation({
    summary: 'Update plan status',
  })
  @ApiResponse({
    status: 200,
    type: Plan,
  })
  updatePlanStatus(
    @Param('userId') userId: string,
    @Param('id') id: string,
    @Body() updatePlanStatusDto: UpdatePlanStatusDto,
  ) {
    return this.planStatusService.updatePlanStatus(
      userId,
      id,
      updatePlanStatusDto,
    );
  }
}

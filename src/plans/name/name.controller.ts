import { Body, Controller, Param, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdatePlanNameDto } from './dto/update-plan-name.dto';
import { Plan } from '../common.entity';
import { PlanNameService } from './name.service';

@ApiTags('plans')
@Controller('plans')
export class PlanNameController {
  constructor(private planNameService: PlanNameService) {}

  @Put(':userId/:id/name')
  @ApiOperation({ summary: 'Update plan name' })
  @ApiResponse({
    status: 200,
    type: Plan,
  })
  updatePlanName(
    @Param('userId') userId: string,
    @Param('id') id: string,
    @Body() updatePlanNameDto: UpdatePlanNameDto,
  ) {
    return this.planNameService.updatePlanName(userId, id, updatePlanNameDto);
  }
}

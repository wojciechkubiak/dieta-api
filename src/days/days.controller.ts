import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { DaysService } from './days.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Day } from './day.entity';

@ApiTags('days')
@Controller('days')
@UseGuards(AuthGuard('jwt'))
export class DaysController {
  private logger = new Logger('PlansController');
  constructor(private daysService: DaysService) {}

  @Get(':planId')
  @ApiOperation({
    summary: 'Get all days based on plan ID.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [Day],
    description: 'Success.',
  })
  @ApiNotFoundResponse({
    description: 'Days for plan not found.',
  })
  @HttpCode(HttpStatus.OK)
  getById(@Param('planId') planId: string, @GetUser() user: User) {
    this.logger.verbose(
      `User "${user.username}" retrieving days for plan ID: ${planId}`,
    );
    return this.daysService.getByPlanId(planId, user);
  }

  @Post(':planId/generate')
  @ApiOperation({
    summary: 'Generate 7 week days for plan ID.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: [Day],
    description: 'Created.',
  })
  @ApiBadRequestResponse({
    description: 'Plan not found or failed to save the days.',
  })
  @ApiConflictResponse({
    description: 'Days already exist.',
  })
  @HttpCode(HttpStatus.CREATED)
  generate(@Param('planId') planId: string, @GetUser() user: User) {
    this.logger.verbose(
      `User "${user.username}" generates empty days for a plan: ${planId}`,
    );
    return this.daysService.create(planId, user);
  }
}

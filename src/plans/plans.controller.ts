import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePlanDto } from './dto/create.dto';

import { Plan } from './plan.entity';
import { PlansService } from './plans.service';
import { UpdateNameDto, UpdateStatusDto } from './dto/update.dto';
import { FilterStatusDto } from './dto/filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';
import { Logger } from '@nestjs/common';

@ApiTags('plans')
@Controller('plans')
@UseGuards(AuthGuard('jwt'))
export class PlansController {
  private logger = new Logger('PlansController');
  constructor(private plansService: PlansService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all user plans.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [Plan],
    description: 'Success.',
  })
  @HttpCode(HttpStatus.OK)
  getAll(@GetUser() user: User) {
    this.logger.verbose(`User "${user.username}" retrieving all tasks`);
    return this.plansService.getAll(user);
  }

  @Get('filter')
  @ApiOperation({
    summary: 'Get all user plans with status.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Plan,
    description: 'Success.',
  })
  @HttpCode(HttpStatus.OK)
  getByStatus(@Query() query: FilterStatusDto, @GetUser() user: User) {
    this.logger.verbose(
      `User "${user.username}" retrieving all plans with status: ${query.status}`,
    );
    return this.plansService.getByStatus(query, user);
  }

  @Get(':planId')
  @ApiOperation({
    summary: 'Get user plan with provided plan ID.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Plan,
    description: 'Success.',
  })
  @HttpCode(HttpStatus.OK)
  getById(@Param('planId') planId: string, @GetUser() user: User) {
    this.logger.verbose(
      `User "${user.username}" retrieving plan with ID: ${planId}`,
    );
    return this.plansService.getById(planId, user);
  }

  @Post()
  @ApiOperation({ summary: 'Create empty plan.' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: Plan,
    description: 'Created.',
  })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPlanDto: CreatePlanDto, @GetUser() user: User) {
    this.logger.verbose(
      `User "${user.username}" creating a plan: ${createPlanDto.name}`,
    );
    return this.plansService.create(createPlanDto, user);
  }

  @Put(':id/name')
  @ApiOperation({ summary: 'Update plan name.' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Plan,
    description: 'Success.',
  })
  @HttpCode(HttpStatus.OK)
  updateName(
    @Param('id') id: string,
    @Body() updateNameDto: UpdateNameDto,
    @GetUser() user: User,
  ) {
    return this.plansService.updateName(id, updateNameDto, user);
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Update plan status.' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Plan,
    description: 'Success.',
  })
  @HttpCode(HttpStatus.OK)
  updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
    @GetUser() user: User,
  ) {
    this.logger.verbose(
      `User "${user.username}" updates status for plan with ID: ${id} to ${updateStatusDto.status}`,
    );
    return this.plansService.updateStatus(id, updateStatusDto, user);
  }
}

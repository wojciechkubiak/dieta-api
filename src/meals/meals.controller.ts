import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MealsService } from './meals.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { MealsDto } from './dto/common.dto';
import { Meal } from './meal.entity';

@ApiTags('meals')
@Controller('meals')
@UseGuards(AuthGuard('jwt'))
export class MealsController {
  constructor(private mealsService: MealsService) {}

  @Get('days/:dayId')
  @ApiOperation({ summary: 'Get meals for specific day.' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [Meal],
  })
  @HttpCode(HttpStatus.OK)
  async getAll(@Param('dayId') dayId: string, @GetUser() user: User) {
    return this.mealsService.getAll(dayId, user);
  }

  @Post('days/:dayId')
  @ApiOperation({ summary: 'Create new meal for specific day.' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: Meal,
  })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createMealDto: MealsDto,
    @Param('dayId') dayId: string,
    @GetUser() user: User,
  ) {
    return this.mealsService.create(createMealDto, dayId, user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get specific meal.' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Meal,
  })
  @HttpCode(HttpStatus.OK)
  async getById(@GetUser() user: User, @Param('id') id: string) {
    return this.mealsService.getById(id, user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Edit specific meal.' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Meal,
  })
  @HttpCode(HttpStatus.OK)
  async edit(
    @Body() editMealDto: MealsDto,
    @Param('id') id: string,
    @GetUser() user: User,
  ) {
    return this.mealsService.edit(editMealDto, id, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete specific meal.' })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  async delete(@GetUser() user: User, @Param('id') id: string) {
    return this.mealsService.remove(id, user);
  }
}

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
import { ApiTags } from '@nestjs/swagger';
import { MealsService } from './meals.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { MealsDto } from './dto/common.dto';

@ApiTags('meals')
@Controller('meals')
@UseGuards(AuthGuard('jwt'))
export class MealsController {
  constructor(private mealsService: MealsService) {}

  @Get('days/:dayId')
  @HttpCode(HttpStatus.OK)
  async getAll(@Param('dayId') dayId: string, @GetUser() user: User) {
    return this.mealsService.getAll(dayId, user);
  }

  @Post('days/:dayId')
  @HttpCode(HttpStatus.OK)
  async create(
    @Body() createMealDto: MealsDto,
    @Param('dayId') dayId: string,
    @GetUser() user: User,
  ) {
    return this.mealsService.create(createMealDto, dayId, user);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getById(@GetUser() user: User, @Param('id') id: string) {
    return this.mealsService.getById(id, user);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async edit(
    @Body() editMealDto: MealsDto,
    @Param('id') id: string,
    @GetUser() user: User,
  ) {
    return this.mealsService.edit(editMealDto, id, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@GetUser() user: User, @Param('id') id: string) {
    return this.mealsService.remove(id, user);
  }
}

import { User } from './../auth/user.entity';
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
import { GetUser } from 'src/auth/get-user.decorator';
import { IngredientsService } from './ingredients.service';
import { CreateIngredientsDto } from './dto/create.dto';
import { EditIngredientDto } from './dto/edit.dto';

@ApiTags('ingredients')
@Controller('ingredients')
@UseGuards(AuthGuard('jwt'))
export class IngredientsController {
  constructor(private ingredientsServices: IngredientsService) {}

  @Get('meta')
  @HttpCode(HttpStatus.OK)
  async getMeta() {
    return this.ingredientsServices.getMeta();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async get(@GetUser() user: User, @Param('id') id: string) {
    return this.ingredientsServices.getById(id, user);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async edit(
    @Body() editIngredientDto: EditIngredientDto,
    @Param('id') id: string,
    @GetUser() user: User,
  ) {
    return this.ingredientsServices.edit(editIngredientDto, id, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@GetUser() user: User, @Param('id') id: string) {
    return this.ingredientsServices.remove(id, user);
  }

  @Get('/meal/:mealId')
  @HttpCode(HttpStatus.OK)
  async getAll(@Param('mealId') mealId: string, @GetUser() user: User) {
    return this.ingredientsServices.getAll(mealId, user);
  }

  @Post('/meal/:mealId')
  @HttpCode(HttpStatus.OK)
  async create(
    @Param('mealId') mealId: string,
    @Body() createIngredientsDto: CreateIngredientsDto[],
    @GetUser() user: User,
  ) {
    return this.ingredientsServices.create(createIngredientsDto, mealId, user);
  }
}

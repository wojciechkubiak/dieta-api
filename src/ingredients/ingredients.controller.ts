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
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser } from 'src/auth/get-user.decorator';
import { IngredientsService } from './ingredients.service';
import { CreateIngredientsDto } from './dto/create.dto';
import { EditIngredientDto } from './dto/edit.dto';
import { Ingredient } from './ingredient.entity';

@ApiTags('ingredients')
@Controller('ingredients')
@UseGuards(AuthGuard('jwt'))
export class IngredientsController {
  constructor(private ingredientsServices: IngredientsService) {}

  @Get('meta')
  @ApiOperation({ summary: 'Get list of unit options.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success.',
  })
  @ApiNotFoundResponse({
    description: 'Failed to load/parse the meta data.',
  })
  @HttpCode(HttpStatus.OK)
  async getMeta() {
    return this.ingredientsServices.getMeta();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get specific ingredient.' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Ingredient,
    description: 'Success.',
  })
  @ApiNotFoundResponse({
    description: 'Ingredient not found.',
  })
  @HttpCode(HttpStatus.OK)
  async getById(@GetUser() user: User, @Param('id') id: string) {
    return this.ingredientsServices.getById(id, user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update specific ingredient.' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Ingredient,
    description: 'Success.',
  })
  @ApiNotFoundResponse({
    description: 'Ingredient not found.',
  })
  @HttpCode(HttpStatus.OK)
  async edit(
    @Body() editIngredientDto: EditIngredientDto,
    @Param('id') id: string,
    @GetUser() user: User,
  ) {
    return this.ingredientsServices.edit(editIngredientDto, id, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete specific ingredient' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success.',
  })
  @ApiNotFoundResponse({
    description: 'Ingredient not found.',
  })
  @HttpCode(HttpStatus.OK)
  async delete(@GetUser() user: User, @Param('id') id: string) {
    return this.ingredientsServices.delete(id, user);
  }

  @Get('/meal/:mealId')
  @ApiOperation({ summary: 'Get all ingredients of a specific meal.' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [Ingredient],
    description: 'Success.',
  })
  @ApiNotFoundResponse({
    description: 'Ingredients for meal not found.',
  })
  @HttpCode(HttpStatus.OK)
  async getAll(@Param('mealId') mealId: string, @GetUser() user: User) {
    return this.ingredientsServices.getAll(mealId, user);
  }

  @Post('/meal/:mealId')
  @ApiOperation({ summary: 'Create new ingredient for a specific meal.' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: Ingredient,
    description: 'Created.',
  })
  @ApiNotFoundResponse({
    description: 'Meal not found.',
  })
  @ApiBadRequestResponse({
    description: 'Failed to add the ingredients.',
  })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Param('mealId') mealId: string,
    @Body() createIngredientsDto: CreateIngredientsDto,
    @GetUser() user: User,
  ) {
    return this.ingredientsServices.create(createIngredientsDto, mealId, user);
  }
}

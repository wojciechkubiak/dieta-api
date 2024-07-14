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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { CategoryDto } from './dto/common.dto';
import { Category } from './category.entity';

@ApiTags('categories')
@Controller('categories')
@UseGuards(AuthGuard('jwt'))
export class CategoriesController {
  constructor(private categoriesServices: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all user ingredients categories.' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [Category],
  })
  @HttpCode(HttpStatus.OK)
  async getAll(@GetUser() user: User) {
    return this.categoriesServices.getAll(user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get specific category.' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Category,
  })
  @HttpCode(HttpStatus.OK)
  async get(@GetUser() user: User, @Param('id') id: string) {
    return this.categoriesServices.getById(id, user);
  }

  @Post()
  @ApiOperation({ summary: 'Create ingredient category.' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: Category,
  })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCategoryDto: CategoryDto, @GetUser() user: User) {
    return this.categoriesServices.create(createCategoryDto, user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update specific ingredient category.' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Category,
  })
  @HttpCode(HttpStatus.OK)
  async edit(
    @Body() updateCategoryDto: CategoryDto,
    @Param('id') id: string,
    @GetUser() user: User,
  ) {
    return this.categoriesServices.edit(updateCategoryDto, id, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete specific ingredient category.' })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  async delete(@GetUser() user: User, @Param('id') id: string) {
    return this.categoriesServices.delete(id, user);
  }
}

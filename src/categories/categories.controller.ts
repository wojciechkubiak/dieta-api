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
import { CategoriesService } from './categories.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { CategoryDto } from './dto/common.dto';

@ApiTags('categories')
@Controller('categories')
@UseGuards(AuthGuard('jwt'))
export class CategoriesController {
  constructor(private categoriesServices: CategoriesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@GetUser() user: User) {
    return this.categoriesServices.getAll(user);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async get(@GetUser() user: User, @Param('id') id: string) {
    return this.categoriesServices.getById(id, user);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() createCategoryDto: CategoryDto, @GetUser() user: User) {
    return this.categoriesServices.create(createCategoryDto, user);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async edit(
    @Body() updateCategoryDto: CategoryDto,
    @Param('id') id: string,
    @GetUser() user: User,
  ) {
    return this.categoriesServices.edit(updateCategoryDto, id, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@GetUser() user: User, @Param('id') id: string) {
    return this.categoriesServices.delete(id, user);
  }
}

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
import { MeasuresService } from './measures.service';
import { CreateMeasureDto } from './dto/create.dto';
import { EditMeasureDto } from './dto/edit.dto';

@ApiTags('measures')
@Controller('measures')
@UseGuards(AuthGuard('jwt'))
export class MeasuresController {
  constructor(private measuresService: MeasuresService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@GetUser() user: User) {
    return this.measuresService.getAll(user);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @Body() createMeasureDto: CreateMeasureDto,
    @GetUser() user: User,
  ) {
    return this.measuresService.create(createMeasureDto, user);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async get(@GetUser() user: User, @Param('id') id: string) {
    return this.measuresService.getById(id, user);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async edit(
    @Body() editMeasureDto: EditMeasureDto,
    @Param('id') id: string,
    @GetUser() user: User,
  ) {
    console.log('hi');
    return this.measuresService.edit(editMeasureDto, id, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@GetUser() user: User, @Param('id') id: string) {
    return this.measuresService.remove(id, user);
  }
}

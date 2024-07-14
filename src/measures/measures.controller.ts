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
import { GetUser } from 'src/auth/get-user.decorator';
import { MeasuresService } from './measures.service';
import { CreateMeasureDto } from './dto/create.dto';
import { EditMeasureDto } from './dto/edit.dto';
import { Measure } from './measure.entity';

@ApiTags('measures')
@Controller('measures')
@UseGuards(AuthGuard('jwt'))
export class MeasuresController {
  constructor(private measuresService: MeasuresService) {}

  @Get()
  @ApiOperation({ summary: 'Get all user measures.' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [Measure],
  })
  @HttpCode(HttpStatus.OK)
  async getAll(@GetUser() user: User) {
    return this.measuresService.getAll(user);
  }

  @Post()
  @ApiOperation({ summary: 'Create new user measure.' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: Measure,
  })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createMeasureDto: CreateMeasureDto,
    @GetUser() user: User,
  ) {
    return this.measuresService.create(createMeasureDto, user);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Create new user measure.' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Measure,
  })
  @HttpCode(HttpStatus.OK)
  async get(@GetUser() user: User, @Param('id') id: string) {
    return this.measuresService.getById(id, user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Edit specific user measure.' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Measure,
  })
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
  @ApiOperation({ summary: 'Delete specific user measure.' })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  async delete(@GetUser() user: User, @Param('id') id: string) {
    return this.measuresService.remove(id, user);
  }
}

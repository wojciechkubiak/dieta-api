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
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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
    description: 'Success.',
  })
  @ApiNotFoundResponse({ description: 'Measures not found.' })
  @HttpCode(HttpStatus.OK)
  async getAll(@GetUser() user: User) {
    return this.measuresService.getAll(user);
  }

  @Post()
  @ApiOperation({ summary: 'Create new user measure.' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: Measure,
    description: 'Created.',
  })
  @ApiConflictResponse({
    description: 'Measure with given date already exists.',
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
    description: 'Success.',
  })
  @ApiNotFoundResponse({ description: 'Measure not found.' })
  @HttpCode(HttpStatus.OK)
  async get(@GetUser() user: User, @Param('id') id: string) {
    return this.measuresService.getById(id, user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Edit specific user measure.' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Measure,
    description: 'Success.',
  })
  @ApiNotFoundResponse({ description: 'Measure not found.' })
  @ApiBadRequestResponse({ description: 'Failed to save.' })
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
  @ApiOperation({
    summary: 'Delete specific user measure.',
  })
  @ApiNotFoundResponse({ description: 'Measure not found.' })
  @ApiBadRequestResponse({ description: 'Failed to delete.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success.',
  })
  @HttpCode(HttpStatus.OK)
  async delete(@GetUser() user: User, @Param('id') id: string) {
    return this.measuresService.delete(id, user);
  }
}

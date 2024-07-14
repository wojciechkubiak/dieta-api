import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SettingsService } from './settings.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { UpdateSettingsDto } from './dto/update.dto';
import { CreateSettingsDto } from './dto/create.dto';
import { Settings } from './settings.entity';

@ApiTags('settings')
@Controller('settings')
@UseGuards(AuthGuard('jwt'))
export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  @Get('meta')
  @ApiOperation({ summary: 'Get gender and activity level options.' })
  @HttpCode(HttpStatus.OK)
  async getMeta() {
    return this.settingsService.getMeta();
  }

  @Get()
  @ApiOperation({ summary: 'Get user settings.' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Settings,
  })
  @HttpCode(HttpStatus.OK)
  async get(@GetUser() user: User) {
    return this.settingsService.get(user);
  }

  @Post()
  @ApiOperation({ summary: 'Create user settings.' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: Settings,
  })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createSettingsDto: CreateSettingsDto,
    @GetUser() user: User,
  ) {
    return this.settingsService.create(createSettingsDto, user);
  }

  @Patch()
  @ApiOperation({ summary: 'Update user settings.' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Settings,
  })
  @HttpCode(HttpStatus.OK)
  async edit(
    @Body() updateSettingsDto: UpdateSettingsDto,
    @GetUser() user: User,
  ) {
    return this.settingsService.edit(updateSettingsDto, user);
  }
}

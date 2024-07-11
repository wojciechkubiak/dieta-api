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
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { UpdateSettingsDto } from './dto/dto/update.dto';
import { CreateSettingsDto } from './dto/dto/create.dto';

@ApiTags('settings')
@Controller('settings')
@UseGuards(AuthGuard('jwt'))
export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  @Get('meta')
  @HttpCode(HttpStatus.OK)
  async getMeta() {
    return this.settingsService.getMeta();
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async get(@GetUser() user: User) {
    return this.settingsService.get(user);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @Body() createSettingsDto: CreateSettingsDto,
    @GetUser() user: User,
  ) {
    return this.settingsService.create(createSettingsDto, user);
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  async edit(
    @Body() updateSettingsDto: UpdateSettingsDto,
    @GetUser() user: User,
  ) {
    return this.settingsService.edit(updateSettingsDto, user);
  }
}

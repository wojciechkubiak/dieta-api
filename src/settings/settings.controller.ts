import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SettingsService } from './settings.service';
import { ApiTags } from '@nestjs/swagger';

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
}

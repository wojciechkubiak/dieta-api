import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('settings')
@UseGuards(AuthGuard('jwt'))
export class SettingsController {}

import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { RepositoryEnum } from 'src/consts';
import { Repository } from 'typeorm';
import { Settings } from './settings.entity';
import { ActivityLevel, Gender } from './settings.enum';

@Injectable()
export class SettingsService {
  constructor(
    @Inject(RepositoryEnum.SETTINGS)
    private settingsRepository: Repository<Settings>,
  ) {}
  private logger = new Logger('SettingsService');

  async getMeta(): Promise<{
    activityLevel: string[];
    gender: string[];
  }> {
    try {
      const activityLevel = Object.keys(ActivityLevel);
      const gender = Object.keys(Gender);

      return {
        activityLevel: activityLevel.splice(
          activityLevel.length / 2,
          activityLevel.length,
        ),
        gender: gender.splice(activityLevel.length / 2, activityLevel.length),
      };
    } catch {
      this.logger.error(`Failed to load the meta data`);
      throw new BadRequestException(`Failed to load the meta data`);
    }
  }
}

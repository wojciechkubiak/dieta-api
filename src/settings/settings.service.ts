import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Settings } from './settings.entity';
import { ActivityLevel, Gender } from './settings.enum';
import { CreateSettingsDto } from './dto/create.dto';
import { User } from 'src/auth/user.entity';
import { UpdateSettingsDto } from './dto/update.dto';

@Injectable()
export class SettingsService {
  constructor(
    @Inject('SETTINGS_REPOSITORY')
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

      return { activityLevel, gender };
    } catch (error) {
      this.logger.error(error.response.message);
      throw new InternalServerErrorException(error.response.message);
    }
  }

  async get(user: User): Promise<Settings> {
    try {
      const found = await this.settingsRepository.findOneBy({
        user,
      });

      if (!found) {
        this.logger.error(`Settings for ${user.username} not found.`);
        throw new NotFoundException(`Settings for ${user.username} not found.`);
      }

      return found;
    } catch (error) {
      this.logger.error(error.response.message);
      throw new InternalServerErrorException(error.response.message);
    }
  }

  async create(
    createSettingsDto: CreateSettingsDto,
    user: User,
  ): Promise<Settings> {
    try {
      const found = await this.settingsRepository.findOneBy({
        user,
      });

      if (found) {
        this.logger.error(
          `Settings for ${user.username} already exist. Edit them instead`,
        );
        throw new ConflictException(
          `Settings for ${user.username} already exist. Edit them instead`,
        );
      }

      const macroPercentageSum =
        +createSettingsDto.carbsPerc +
        +createSettingsDto.proteinsPerc +
        +createSettingsDto.fatPerc;

      console.log(macroPercentageSum);
      if (macroPercentageSum !== 100) {
        this.logger.error(
          `Sum of macro for user: "${user.username}" is not equal to 100`,
        );
        throw new BadRequestException(
          `Sum of macro for user: "${user.username}" is not equal to 100`,
        );
      }

      const settings = this.settingsRepository.create({
        ...createSettingsDto,
        user,
      });

      const saved = await this.settingsRepository.save(settings);

      if (!saved) {
        this.logger.error(
          `Failed to save the settings for user "${user.username}"`,
        );
        throw new BadRequestException(
          `Failed to save the settings for user "${user.username}"`,
        );
      }

      return saved;
    } catch (error) {
      this.logger.error(error.response.message);
      throw new InternalServerErrorException(error.response.message);
    }
  }

  async edit(
    updateSettingsDto: UpdateSettingsDto,
    user: User,
  ): Promise<Settings> {
    try {
      const found = await this.settingsRepository.findOneBy({ user });

      if (!found) {
        this.logger.error(
          `Failed to get settings of the user "${user.username}"`,
        );
        throw new NotFoundException(
          `Failed to get settings of the user "${user.username}"`,
        );
      }

      const updated = await this.settingsRepository.save({
        ...found,
        ...updateSettingsDto,
      });

      if (!updated) {
        this.logger.error(
          `Failed to update settings for user "${user.username}"`,
        );
        throw new BadRequestException(
          `Failed to update settings for user "${user.username}"`,
        );
      }

      return updated;
    } catch (error) {
      this.logger.error(error.response.message);
      throw new InternalServerErrorException(error.response.message);
    }
  }
}

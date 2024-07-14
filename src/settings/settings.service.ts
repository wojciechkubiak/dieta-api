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
import { RepositoryType } from 'src/repository.consts';

@Injectable()
export class SettingsService {
  constructor(
    @Inject(RepositoryType.SETTINGS)
    private settingsRepository: Repository<Settings>,
  ) {}
  private logger = new Logger('SettingsService');

  async getMeta(): Promise<{
    activityLevel: string[];
    gender: string[];
  }> {
    const FAILED_TO_LOAD_META_DATA_ERROR_MESSAGE = `Failed to load the meta data.`;

    try {
      const activityLevel = Object.keys(ActivityLevel);
      const gender = Object.keys(Gender);

      return { activityLevel, gender };
    } catch {
      this.logger.error(FAILED_TO_LOAD_META_DATA_ERROR_MESSAGE);
      throw new InternalServerErrorException(
        FAILED_TO_LOAD_META_DATA_ERROR_MESSAGE,
      );
    }
  }

  async get(user: User): Promise<Settings> {
    const NOT_FOUND_ERROR_MESSAGE = `Settings for ${user.username} not found.`;

    try {
      const found = await this.settingsRepository.findOneBy({
        user,
      });

      if (!found) {
        this.logger.error(NOT_FOUND_ERROR_MESSAGE);
        throw new NotFoundException(NOT_FOUND_ERROR_MESSAGE);
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
    const ALREADY_EXISTS_ERROR_MESSAGE = `Settings for "${user.username}" already exist. Edit them instead.`;
    const MACRO_ERROR_MESSAGE = `Sum of macro for user "${user.username}" is not equal to 100.`;
    const FAILED_TO_SAVE_ERROR_MESSAGE = `Failed to save the settings for user "${user.username}".`;

    try {
      const found = await this.settingsRepository.findOneBy({
        user,
      });

      if (found) {
        this.logger.error(ALREADY_EXISTS_ERROR_MESSAGE);
        throw new ConflictException(ALREADY_EXISTS_ERROR_MESSAGE);
      }

      const macroPercentageSum =
        +createSettingsDto.carbsPerc +
        +createSettingsDto.proteinsPerc +
        +createSettingsDto.fatPerc;

      console.log(macroPercentageSum);
      if (macroPercentageSum !== 100) {
        this.logger.error(MACRO_ERROR_MESSAGE);
        throw new BadRequestException(MACRO_ERROR_MESSAGE);
      }

      const settings = this.settingsRepository.create({
        ...createSettingsDto,
        user,
      });

      const saved = await this.settingsRepository.save(settings);

      if (!saved) {
        this.logger.error(FAILED_TO_SAVE_ERROR_MESSAGE);
        throw new BadRequestException(FAILED_TO_SAVE_ERROR_MESSAGE);
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
    const NOT_FOUND_ERROR_MESSAGE = `Settings of the user "${user.username}" not found.`;
    const FAILED_TO_UPDATE_ERROR_MESSAGE = `Failed to update settings for user "${user.username}".`;

    try {
      const found = await this.settingsRepository.findOneBy({ user });

      if (!found) {
        this.logger.error(NOT_FOUND_ERROR_MESSAGE);
        throw new NotFoundException(NOT_FOUND_ERROR_MESSAGE);
      }

      const updated = await this.settingsRepository.save({
        ...found,
        ...updateSettingsDto,
      });

      if (!updated) {
        this.logger.error(FAILED_TO_UPDATE_ERROR_MESSAGE);
        throw new BadRequestException(FAILED_TO_UPDATE_ERROR_MESSAGE);
      }

      return updated;
    } catch (error) {
      this.logger.error(error.response.message);
      throw new InternalServerErrorException(error.response.message);
    }
  }
}

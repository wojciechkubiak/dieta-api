import { Measure } from './measure.entity';
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { CreateMeasureDto } from './dto/create.dto';
import { EditMeasureDto } from './dto/edit.dto';

@Injectable()
export class MeasuresService {
  constructor(
    @Inject('MEASURES_REPOSITORY')
    private measuresRepository: Repository<Measure>,
  ) {}
  private logger = new Logger('MeasuresService');

  async getById(id: string, user: User): Promise<Measure> {
    const MEASURE_NOT_FOUND_ERROR_MESSAGE = `Measure for "${user.username}" with ID ${id} not found.`;

    try {
      const found = await this.measuresRepository.findOneBy({
        id,
        user,
      });

      if (!found) {
        this.logger.error(MEASURE_NOT_FOUND_ERROR_MESSAGE);
        throw new NotFoundException(MEASURE_NOT_FOUND_ERROR_MESSAGE);
      }

      return found;
    } catch (error) {
      this.logger.error(error.response.message);
      throw new InternalServerErrorException(error.response.message);
    }
  }

  async getAll(user: User): Promise<Measure[]> {
    const MEASURES_NOT_FOUND_ERROR_MESSAGE = `Measures for "${user.username}" not found.`;

    try {
      const found = await this.measuresRepository.findBy({
        user,
      });

      if (!found.length) {
        this.logger.error(MEASURES_NOT_FOUND_ERROR_MESSAGE);
        throw new NotFoundException(MEASURES_NOT_FOUND_ERROR_MESSAGE);
      }

      return found;
    } catch (error) {
      this.logger.error(error.response.message);
      throw new InternalServerErrorException(error.response.message);
    }
  }

  async create(
    createMeasureDto: CreateMeasureDto,
    user: User,
  ): Promise<Measure> {
    const MEASURE_EXISTS_ERROR_MESSAGE = `Measure for day "${createMeasureDto.date}" and user "${user.username}" already exists. Edit it instead.`;
    const FAILED_TO_ADD_MEASURE = `Failed to add measure for user "${user.username}".`;

    try {
      const exists = await this.measuresRepository.findOneBy({
        date: createMeasureDto.date,
        user,
      });

      if (exists) {
        this.logger.error(MEASURE_EXISTS_ERROR_MESSAGE);
        throw new ConflictException(MEASURE_EXISTS_ERROR_MESSAGE);
      }

      const created = this.measuresRepository.create({
        ...createMeasureDto,
        user,
      });

      if (!created) {
        this.logger.error(FAILED_TO_ADD_MEASURE);
        throw new BadRequestException(FAILED_TO_ADD_MEASURE);
      }

      const saved = await this.measuresRepository.save(created);

      if (!saved) {
        this.logger.error(FAILED_TO_ADD_MEASURE);
        throw new BadRequestException(FAILED_TO_ADD_MEASURE);
      }

      return saved;
    } catch (error) {
      this.logger.error(error.response.message);
      throw new InternalServerErrorException(error.response.message);
    }
  }

  async edit(
    editMeasureDto: EditMeasureDto,
    id: string,
    user: User,
  ): Promise<Measure> {
    const MEASURE_NOT_FOUND_ERROR_MESSAGE = `Measure "${id}" for user "${user.username}" not found.`;
    const FAILED_TO_UPDATE_ERROR_MESSAGE = `Failed to update measure "${id}" for user "${user.username}".`;

    try {
      let found = await this.measuresRepository.findOneBy({
        id,
        user,
      });

      if (!found) {
        this.logger.error(MEASURE_NOT_FOUND_ERROR_MESSAGE);
        throw new NotFoundException(MEASURE_NOT_FOUND_ERROR_MESSAGE);
      }

      found = {
        ...found,
        ...editMeasureDto,
      };

      const updated = await this.measuresRepository.save(found);

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

  async remove(id: string, user: User): Promise<void> {
    const MEASURE_NOT_FOUND_ERROR_MESSAGE = `Measure "${id}" for user "${user.username}" not found.`;
    const FAILED_TO_DELETE_MEASURE_ERROR_MESSAGE = `Failed to delete measure "${id}" for user "${user.username}".`;

    try {
      const found = await this.measuresRepository.findOneBy({
        id,
        user,
      });

      if (!found) {
        this.logger.error(MEASURE_NOT_FOUND_ERROR_MESSAGE);
        throw new NotFoundException(MEASURE_NOT_FOUND_ERROR_MESSAGE);
      }

      const deleted = await this.measuresRepository.delete({ id: found.id });

      if (!deleted) {
        this.logger.error(FAILED_TO_DELETE_MEASURE_ERROR_MESSAGE);
        throw new BadRequestException(FAILED_TO_DELETE_MEASURE_ERROR_MESSAGE);
      }
    } catch (error) {
      this.logger.error(error.response.message);
      throw new InternalServerErrorException(error.response.message);
    }
  }
}

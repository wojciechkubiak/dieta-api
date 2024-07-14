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
    try {
      const found = await this.measuresRepository.findOneBy({
        id,
        user,
      });

      if (!found) {
        this.logger.error(
          `Measure for ${user.username} with ID ${id} not found.`,
        );
        throw new NotFoundException(
          `Measure for ${user.username} with ID ${id} not found.`,
        );
      }

      return found;
    } catch {
      this.logger.error(
        `Measure for ${user.username} with ID ${id} not found.`,
      );
      throw new NotFoundException(
        `Measure for ${user.username} with ID ${id} not found.`,
      );
    }
  }

  async getAll(user: User): Promise<Measure[]> {
    try {
      const found = await this.measuresRepository.findBy({
        user,
      });

      if (!found.length) {
        this.logger.error(`Measures for ${user.username} not found.`);
        throw new NotFoundException(`Measures for ${user.username} not found.`);
      }

      return found;
    } catch {
      this.logger.error(`Measures for ${user.username} not found.`);
      throw new NotFoundException(`Measures for ${user.username} not found.`);
    }
  }

  async create(
    createMeasureDto: CreateMeasureDto,
    user: User,
  ): Promise<Measure> {
    try {
      const exists = await this.measuresRepository.findOneBy({
        date: createMeasureDto.date,
        user,
      });

      if (exists) {
        this.logger.error(
          `Measure for day: "${createMeasureDto.date}" and user: "${user.username}" already exists. Edit it instead`,
        );

        throw new ConflictException(
          `Measure for day: "${createMeasureDto.date}" and user: "${user.username}" already exists. Edit it instead`,
        );
      }

      const created = this.measuresRepository.create({
        ...createMeasureDto,
        user,
      });

      if (!created) {
        this.logger.error(`Failed to add measure for user "${user.username}"`);
        throw new BadRequestException(
          `Failed to add measure for user "${user.username}"`,
        );
      }

      const saved = await this.measuresRepository.save(created);

      if (!saved) {
        this.logger.error(`Failed to add measure for user "${user.username}"`);
        throw new BadRequestException(
          `Failed to add measure for user "${user.username}"`,
        );
      }

      return saved;
    } catch (error) {
      this.logger.error(`Failed to add measure for user "${user.username}"`);
      throw new InternalServerErrorException(error.response.message);
    }
  }

  async edit(
    editMeasureDto: EditMeasureDto,
    id: string,
    user: User,
  ): Promise<Measure> {
    try {
      let found = await this.measuresRepository.findOneBy({
        id,
        user,
      });

      if (!found) {
        this.logger.error(
          `Failed to get measure: ${id} for user "${user.username}"`,
        );
        throw new NotFoundException(
          `Failed to get measure: ${id} for user "${user.username}"`,
        );
      }

      found = {
        ...found,
        ...editMeasureDto,
      };

      const updated = await this.measuresRepository.save(found);

      if (!updated) {
        this.logger.error(
          `Failed to update measure: ${id} for user "${user.username}"`,
        );
        throw new BadRequestException(`Failed to update measure: ${id}`);
      }

      return updated;
    } catch (error) {
      this.logger.error(
        `Failed to get ingredient: ${id} for user "${user.username}"`,
      );
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string, user: User): Promise<void> {
    try {
      const found = await this.measuresRepository.findOneBy({
        id,
        user,
      });

      if (!found) {
        this.logger.error(
          `Failed to get measure: ${id} for user "${user.username}"`,
        );
        throw new NotFoundException(
          `Failed to get measure: ${id} for user "${user.username}"`,
        );
      }

      const deleted = await this.measuresRepository.delete({ id: found.id });

      if (!deleted) {
        this.logger.error(
          `Failed to delete measure: ${id} for user "${user.username}"`,
        );
        throw new BadRequestException(`Could not delete measure "${id}"`);
      }
    } catch (error) {
      this.logger.error(
        `Failed to get measure: ${id} for user "${user.username}"`,
      );
      throw new InternalServerErrorException(error.response.message);
    }
  }
}

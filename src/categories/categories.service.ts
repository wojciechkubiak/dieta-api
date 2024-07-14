import { Category } from './category.entity';
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
import { CategoryDto } from './dto/common.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject('CATEGORIES_REPOSITORY')
    private categoriesRepository: Repository<Category>,
  ) {}
  private logger = new Logger('MealsService');

  async getById(id: string, user: User): Promise<any> {
    const CATEGORY_NOT_FOUND_ERROR_MESSAGE = `Category for ${user.username} with ID ${id} not found.`;

    try {
      const found = await this.categoriesRepository.findOneBy({
        id,
        user,
      });

      if (!found) {
        this.logger.error(CATEGORY_NOT_FOUND_ERROR_MESSAGE);
        throw new NotFoundException(CATEGORY_NOT_FOUND_ERROR_MESSAGE);
      }

      return found;
    } catch (error) {
      this.logger.error(error.response.message);
      throw new InternalServerErrorException(error.response.message);
    }
  }

  async getAll(user: User): Promise<any> {
    const CATEGORIES_NOT_FOUND_ERROR_MESSAGE = `Categories for ${user.username} not found.`;
    try {
      const found = await this.categoriesRepository.findBy({
        user,
      });

      if (!found.length) {
        this.logger.error(CATEGORIES_NOT_FOUND_ERROR_MESSAGE);
        throw new NotFoundException(CATEGORIES_NOT_FOUND_ERROR_MESSAGE);
      }

      return found;
    } catch (error) {
      this.logger.error(error.response.message);
      throw new InternalServerErrorException(error.response.message);
    }
  }

  async create({ category }: CategoryDto, user: User): Promise<any> {
    const CATEGORY_EXISTS_ERROR_MESSAGE = `Category "${category}" for user "${user.username}" already exist`;
    const FAILED_TO_CREATE_ERROR_MESSAGE = `Failed to create the category "${category}" for user "${user.username}"`;
    const FAILED_TO_SAVE_ERROR_MESSAGE = `Failed to save the category "${category}" for user "${user.username}"`;

    try {
      const exist = await this.categoriesRepository.findOneBy({
        category,
        user,
      });

      if (exist) {
        this.logger.error(CATEGORY_EXISTS_ERROR_MESSAGE);
        throw new ConflictException(CATEGORY_EXISTS_ERROR_MESSAGE);
      }

      const created = this.categoriesRepository.create({ category, user });

      if (!created) {
        this.logger.error(FAILED_TO_CREATE_ERROR_MESSAGE);
        throw new BadRequestException(FAILED_TO_CREATE_ERROR_MESSAGE);
      }

      const saved = await this.categoriesRepository.save(created);

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

  async edit({ category }: CategoryDto, id: string, user: User): Promise<any> {
    const CATEGORY_NOT_FOUND_ERROR_MESSAGE = `Category "${id}" for the user "${user.username}" not found`;
    const FAILED_UPDATE_ERROR_MESSAGE = `Failed to update category "${id}" with name "${category}" for user "${user.username}"`;

    try {
      const found = await this.categoriesRepository.findOneBy({ id, user });

      if (!found) {
        this.logger.error(CATEGORY_NOT_FOUND_ERROR_MESSAGE);
        throw new NotFoundException(CATEGORY_NOT_FOUND_ERROR_MESSAGE);
      }

      found.category = category;

      const updated = await this.categoriesRepository.save(found);

      if (!updated) {
        this.logger.error(FAILED_UPDATE_ERROR_MESSAGE);
        throw new BadRequestException(FAILED_UPDATE_ERROR_MESSAGE);
      }

      return updated;
    } catch (error) {
      this.logger.error(error.response.message);
      throw new InternalServerErrorException(error.response.message);
    }
  }

  async delete(id: string, user: User): Promise<any> {
    const CATEGORY_NOT_FOUND_ERROR_MESSAGE = `Category "${id}" for the user "${user.username}" not found`;
    const FAILED_DELETE_ERROR_MESSAGE = `Failed to delete category "${id}" for user "${user.username}"`;

    try {
      const found = await this.categoriesRepository.findOneBy({ id, user });

      if (!found) {
        this.logger.error(CATEGORY_NOT_FOUND_ERROR_MESSAGE);
        throw new NotFoundException(CATEGORY_NOT_FOUND_ERROR_MESSAGE);
      }

      const deleted = await this.categoriesRepository.delete({ id: found.id });

      if (!deleted) {
        this.logger.error(FAILED_DELETE_ERROR_MESSAGE);
        throw new BadRequestException(FAILED_DELETE_ERROR_MESSAGE);
      }
    } catch (error) {
      this.logger.error(error.response.message);
      throw new InternalServerErrorException(error.response.message);
    }
  }
}

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
    try {
      const found = await this.categoriesRepository.findOneBy({
        id,
        user,
      });

      if (!found) {
        this.logger.error(
          `Category for ${user.username} with ID ${id} not found.`,
        );
        throw new NotFoundException(
          `Category for ${user.username} with ID ${id} not found.`,
        );
      }

      return found;
    } catch {
      this.logger.error(
        `Category for ${user.username} with ID ${id} not found.`,
      );
      throw new NotFoundException(
        `Category for ${user.username} with ID ${id} not found.`,
      );
    }
  }

  async getAll(user: User): Promise<any> {
    try {
      const found = await this.categoriesRepository.findBy({
        user,
      });

      if (!found.length) {
        this.logger.error(`Categories for ${user.username} not found.`);
        throw new NotFoundException(
          `Categories for ${user.username} not found.`,
        );
      }

      return found;
    } catch {
      this.logger.error(`Categories for ${user.username} not found.`);
      throw new NotFoundException(`Categories for ${user.username} not found.`);
    }
  }

  async create({ category }: CategoryDto, user: User): Promise<any> {
    try {
      const exist = await this.categoriesRepository.findOneBy({
        category,
        user,
      });

      if (exist) {
        this.logger.error(
          `Category "${category}" for user: "${user.username}" already exist`,
        );

        throw new ConflictException(
          `Category "${category}" for user: "${user.username}" already exist`,
        );
      }

      const created = this.categoriesRepository.create({ category, user });

      if (!created) {
        this.logger.error(
          `Failed to create the category "${category}" for user "${user.username}"`,
        );
        throw new BadRequestException(
          `Failed to create the category "${category}" for user "${user.username}"`,
        );
      }

      const saved = await this.categoriesRepository.save(created);

      if (!saved) {
        this.logger.error(
          `Failed to save the category "${category}" for user "${user.username}"`,
        );
        throw new BadRequestException(
          `Failed to save the category "${category}" for user "${user.username}"`,
        );
      }

      return saved;
    } catch {
      this.logger.error(
        `Failed to save the category "${category}" for user "${user.username}"`,
      );
      throw new InternalServerErrorException(
        `Failed to save the category "${category}" for user "${user.username}"`,
      );
    }
  }

  async edit({ category }: CategoryDto, id: string, user: User): Promise<any> {
    try {
      const found = await this.categoriesRepository.findOneBy({ id, user });

      if (!found) {
        this.logger.error(
          `Failed to get category: ${id} for user "${user.username}"`,
        );
        throw new NotFoundException(
          `Category: ${id} not found for the user: ${user.username}`,
        );
      }

      found.category = category;

      const updated = await this.categoriesRepository.save(found);

      if (!updated) {
        this.logger.error(
          `Failed to update category: ${id} with name "${category}" for user "${user.username}"`,
        );
        throw new BadRequestException(`Failed to update category: ${id}`);
      }

      return updated;
    } catch (error) {
      this.logger.error(
        `Failed to update category: ${id} with name "${category}" for user "${user.username}"`,
      );
      throw new InternalServerErrorException(error);
    }
  }

  async delete(id: string, user: User): Promise<any> {
    try {
      const found = await this.categoriesRepository.findOneBy({ id, user });

      if (!found) {
        this.logger.error(
          `Failed to get category: ${id} for user "${user.username}"`,
        );
        throw new NotFoundException(
          `Category: ${id} not found for the user: ${user.username}`,
        );
      }

      const deleted = await this.categoriesRepository.delete(found);

      if (!deleted) {
        this.logger.error(
          `Failed to delete category: ${id} for user "${user.username}"`,
        );
        throw new BadRequestException(`Could not delete category "${id}"`);
      }
    } catch (error) {
      this.logger.error(
        `Failed to delete category: ${id} for user "${user.username}"`,
      );
      throw new InternalServerErrorException(error);
    }
  }
}

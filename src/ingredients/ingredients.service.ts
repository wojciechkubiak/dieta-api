import { Ingredient } from './ingredient.entity';
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { CreateIngredientsDto } from './dto/create.dto';
import { Meal } from 'src/meals/meal.entity';
import { EditIngredientDto } from './dto/edit.dto';
import { Unit } from './ingredients.enum';

@Injectable()
export class IngredientsService {
  constructor(
    @Inject('INGREDIENTS_REPOSITORY')
    private ingredientsRepository: Repository<Ingredient>,
    @Inject('MEALS_REPOSITORY')
    private mealsRepository: Repository<Meal>,
  ) {}
  private logger = new Logger('IngredientsService');

  async getMeta(): Promise<string[]> {
    try {
      return Object.keys(Unit);
    } catch {
      this.logger.error(`Failed to load the meta data`);
      throw new NotFoundException(`Failed to load the meta data`);
    }
  }

  async getById(id: string, user: User): Promise<Ingredient> {
    try {
      const found = await this.ingredientsRepository.findOneBy({
        id,
        meal: {
          day: {
            plan: {
              user,
            },
          },
        },
      });

      if (!found) {
        this.logger.error(
          `Ingredient for ${user.username} with ID ${id} not found.`,
        );
        throw new NotFoundException(
          `Ingredient for ${user.username} with ID ${id} not found.`,
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

  async getAll(mealId: string, user: User): Promise<Ingredient[]> {
    try {
      const found = await this.ingredientsRepository.findBy({
        meal: {
          id: mealId,
          day: {
            plan: {
              user,
            },
          },
        },
      });

      if (!found.length) {
        this.logger.error(
          `Ingredients for meal ${mealId} of the user ${user.username} not found.`,
        );
        throw new NotFoundException(
          `Ingredients for meal ${mealId} of the user ${user.username} not found.`,
        );
      }

      return found;
    } catch {
      this.logger.error(
        `Ingredients for meal ${mealId} of the user ${user.username} not found.`,
      );
      throw new NotFoundException(
        `Ingredients for meal ${mealId} of the user ${user.username} not found.`,
      );
    }
  }

  async create(
    createIngredientsDto: CreateIngredientsDto,
    mealId: string,
    user: User,
  ): Promise<Ingredient> {
    try {
      const foundMeal = await this.mealsRepository.findOneBy({ id: mealId });

      if (!foundMeal) {
        this.logger.error(
          `Meal for ${user.username} with ID ${mealId} not found.`,
        );
        throw new NotFoundException(
          `Meal for ${user.username} with ID ${mealId} not found.`,
        );
      }

      const created = this.ingredientsRepository.create({
        ...createIngredientsDto,
        meal: foundMeal,
      });

      if (!created) {
        this.logger.error(
          `Failed to add ingredients to the meal "${mealId}" for user "${user.username}"`,
        );
        throw new BadRequestException(
          `Failed to add ingredients to the meal "${mealId}" for user "${user.username}"`,
        );
      }

      const saved = await this.ingredientsRepository.save(created);

      if (!saved) {
        this.logger.error(
          `Failed to add ingredients to the meal "${mealId}" for user "${user.username}"`,
        );
        throw new BadRequestException(
          `Failed to add ingredients to the meal "${mealId}" for user "${user.username}"`,
        );
      }

      return saved;
    } catch {
      this.logger.error(
        `Failed to add ingredients to the meal "${mealId}" for user "${user.username}"`,
      );
      throw new InternalServerErrorException(
        `Failed to add ingredients to the meal "${mealId}" for user "${user.username}"`,
      );
    }
  }

  async edit(
    editDealDto: EditIngredientDto,
    id: string,
    user: User,
  ): Promise<Ingredient> {
    try {
      let found = await this.ingredientsRepository.findOneBy({
        id,
        meal: {
          day: {
            plan: {
              user,
            },
          },
        },
      });

      if (!found) {
        this.logger.error(
          `Failed to get ingredient: ${id} for user "${user.username}"`,
        );
        throw new NotFoundException(
          `Failed to get ingredient: ${id} for user "${user.username}"`,
        );
      }

      found = {
        ...found,
        ...editDealDto,
      };

      const updated = await this.ingredientsRepository.save(found);

      if (!updated) {
        this.logger.error(
          `Failed to update ingredient: ${id} for user "${user.username}"`,
        );
        throw new BadRequestException(`Failed to update ingredient: ${id}`);
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
      const found = await this.ingredientsRepository.findOneBy({
        id,
        meal: {
          day: {
            plan: {
              user,
            },
          },
        },
      });

      if (!found) {
        this.logger.error(
          `Failed to get ingredient: ${id} for user "${user.username}"`,
        );
        throw new NotFoundException(
          `Failed to get ingredient: ${id} for user "${user.username}"`,
        );
      }

      const deleted = await this.ingredientsRepository.delete({ id: found.id });

      if (!deleted) {
        this.logger.error(
          `Failed to delete ingredient: ${id} for user "${user.username}"`,
        );
        throw new BadRequestException(`Could not delete ingredient "${id}"`);
      }
    } catch (error) {
      this.logger.error(
        `Failed to get ingredient: ${id} for user "${user.username}"`,
      );
      throw new InternalServerErrorException(error);
    }
  }
}

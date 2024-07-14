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
import { RepositoryType } from 'src/repository.consts';

@Injectable()
export class IngredientsService {
  constructor(
    @Inject(RepositoryType.INGREDIENTS)
    private ingredientsRepository: Repository<Ingredient>,
    @Inject(RepositoryType.MEALS)
    private mealsRepository: Repository<Meal>,
  ) {}
  private logger = new Logger('IngredientsService');

  async getMeta(): Promise<string[]> {
    const FAILED_TO_LOAD_META_DATA_ERROR_MESSAGE = `Failed to load the meta data.`;

    try {
      return Object.keys(Unit);
    } catch {
      this.logger.error(FAILED_TO_LOAD_META_DATA_ERROR_MESSAGE);
      throw new NotFoundException(FAILED_TO_LOAD_META_DATA_ERROR_MESSAGE);
    }
  }

  async getById(id: string, user: User): Promise<Ingredient> {
    const NOT_FOUND_ERROR_MESSAGE = `Ingredient for ${user.username} with ID ${id} not found.`;

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
        this.logger.error(NOT_FOUND_ERROR_MESSAGE);
        throw new NotFoundException(NOT_FOUND_ERROR_MESSAGE);
      }

      return found;
    } catch (error) {
      this.logger.error(error.response.message);
      throw new InternalServerErrorException(error.response.message);
    }
  }

  async getAll(mealId: string, user: User): Promise<Ingredient[]> {
    const NOT_FOUND_ERROR_MESSAGE = `Ingredients for meal ${mealId} of the user ${user.username} not found.`;

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
    createIngredientsDto: CreateIngredientsDto,
    mealId: string,
    user: User,
  ): Promise<Ingredient> {
    const NOT_FOUND_ERROR_MESSAGE = `Meal for "${user.username}" with ID "${mealId}" not found.`;
    const FAILED_TO_ADD_MEAL_ERROR_MESSAGE = `Failed to add ingredients to the meal "${mealId}" for user "${user.username}".`;
    const FAILED_TO_ADD_INGREDIENTS_ERROR_MESSAGE = `Failed to add ingredients to the meal "${mealId}" for user "${user.username}".`;

    try {
      const meal = await this.mealsRepository.findOneBy({ id: mealId });

      if (!meal) {
        this.logger.error(NOT_FOUND_ERROR_MESSAGE);
        throw new NotFoundException(NOT_FOUND_ERROR_MESSAGE);
      }

      const created = this.ingredientsRepository.create({
        ...createIngredientsDto,
        meal,
      });

      if (!created) {
        this.logger.error(FAILED_TO_ADD_MEAL_ERROR_MESSAGE);
        throw new BadRequestException(FAILED_TO_ADD_MEAL_ERROR_MESSAGE);
      }

      const saved = await this.ingredientsRepository.save(created);

      if (!saved) {
        this.logger.error(FAILED_TO_ADD_INGREDIENTS_ERROR_MESSAGE);
        throw new BadRequestException(FAILED_TO_ADD_INGREDIENTS_ERROR_MESSAGE);
      }

      return saved;
    } catch (error) {
      this.logger.error(error.response.message);
      throw new InternalServerErrorException(error.response.message);
    }
  }

  async edit(
    editDealDto: EditIngredientDto,
    id: string,
    user: User,
  ): Promise<Ingredient> {
    const NOT_FOUND_ERROR_MESSAGE = `Ingredient "${id}" for user "${user.username}" not found.`;
    const FAILED_UPDATE_ERROR_MESSAGE = `Failed to update ingredient "${id}" for user "${user.username}".`;

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
        this.logger.error(NOT_FOUND_ERROR_MESSAGE);
        throw new NotFoundException(NOT_FOUND_ERROR_MESSAGE);
      }

      found = {
        ...found,
        ...editDealDto,
      };

      const updated = await this.ingredientsRepository.save(found);

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

  async remove(id: string, user: User): Promise<void> {
    const NOT_FOUND_ERROR_MESSAGE = `Ingredient "${id}" for user "${user.username}" not found.`;
    const FAILED_TO_DELETE_ERROR_MESSAGE = `Failed to delete ingredient "${id}" for user "${user.username}".`;

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
        this.logger.error(NOT_FOUND_ERROR_MESSAGE);
        throw new NotFoundException(NOT_FOUND_ERROR_MESSAGE);
      }

      const deleted = await this.ingredientsRepository.delete({ id: found.id });

      if (!deleted) {
        this.logger.error(FAILED_TO_DELETE_ERROR_MESSAGE);
        throw new BadRequestException(FAILED_TO_DELETE_ERROR_MESSAGE);
      }
    } catch (error) {
      this.logger.error(error.response.message);
      throw new InternalServerErrorException(error.response.message);
    }
  }
}

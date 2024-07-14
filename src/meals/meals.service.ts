import { Meal } from './meal.entity';
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { Day } from 'src/days/day.entity';
import { Repository } from 'typeorm';
import { MealsDto } from './dto/common.dto';
import { Ingredient } from 'src/ingredients/ingredient.entity';
import { RepositoryType } from 'src/repository.consts';

@Injectable()
export class MealsService {
  constructor(
    @Inject(RepositoryType.MEALS)
    private mealsRepository: Repository<Meal>,
    @Inject(RepositoryType.DAYS)
    private daysRepository: Repository<Day>,
    @Inject(RepositoryType.INGREDIENTS)
    private ingredientsRepository: Repository<Ingredient>,
  ) {}
  private logger = new Logger('MealsService');

  async getById(id: string, user: User): Promise<Meal> {
    const MEAL_NOT_FOUND_ERROR_MESSAGE = `Meal with ID "${id}" for "${user.username}" not found.`;

    try {
      const found = await this.mealsRepository.findOneBy({
        id,
        day: {
          plan: {
            user,
          },
        },
      });

      if (!found) {
        this.logger.error(MEAL_NOT_FOUND_ERROR_MESSAGE);
        throw new NotFoundException(MEAL_NOT_FOUND_ERROR_MESSAGE);
      }

      return found;
    } catch (error) {
      this.logger.error(error.response.message);
      throw new InternalServerErrorException(error.response.message);
    }
  }

  async getAll(dayId: string, user: User): Promise<Meal[]> {
    const MEALS_NOT_FOUND_ERROR_MESSAGE = `Meals for day "${dayId}" of the user "${user.username}" not found.`;

    try {
      const found = await this.mealsRepository.findBy({
        day: {
          id: dayId,
          plan: {
            user,
          },
        },
      });

      // TODO: Fix the order

      if (!found.length) {
        this.logger.error(MEALS_NOT_FOUND_ERROR_MESSAGE);
        throw new NotFoundException(MEALS_NOT_FOUND_ERROR_MESSAGE);
      }

      return found;
    } catch (error) {
      this.logger.error(error.response.message);
      throw new InternalServerErrorException(error.response.message);
    }
  }

  async create(
    createMealDto: MealsDto,
    dayId: string,
    user: User,
  ): Promise<Meal> {
    const DAY_NOT_FOUND_ERROR_MESSAGE = `Day for "${user.username}" with ID "${dayId}" not found.`;
    const FAILED_TO_ADD_MEAL_ERROR_MESSAGE = `Failed to add meal to the day "${dayId}" for user "${user.username}".`;

    try {
      const foundDay = await this.daysRepository.findOneBy({
        id: dayId,
        plan: {
          user,
        },
      });

      if (!foundDay) {
        this.logger.error(DAY_NOT_FOUND_ERROR_MESSAGE);
        throw new NotFoundException(DAY_NOT_FOUND_ERROR_MESSAGE);
      }

      const created = this.mealsRepository.create({
        ...createMealDto,
        day: foundDay,
      });

      if (!created) {
        this.logger.error(FAILED_TO_ADD_MEAL_ERROR_MESSAGE);
        throw new BadRequestException(FAILED_TO_ADD_MEAL_ERROR_MESSAGE);
      }

      const saved = await this.mealsRepository.save(created);

      if (!saved) {
        this.logger.error(FAILED_TO_ADD_MEAL_ERROR_MESSAGE);
        throw new BadRequestException(FAILED_TO_ADD_MEAL_ERROR_MESSAGE);
      }

      return saved;
    } catch (error) {
      this.logger.error(error.response.message);
      throw new InternalServerErrorException(error.response.message);
    }
  }

  async edit(editMealDto: MealsDto, mealId: string, user: User): Promise<Meal> {
    const MEAL_NOT_FOUND_ERROR_MESSAGE = `Meal "${mealId}" for user "${user.username}" not found.`;
    const MEAL_NOT_UPDATED_ERROR_MESSAGE = `Failed to update meal "${mealId}".`;

    try {
      let found = await this.mealsRepository.findOneBy({
        id: mealId,
        day: {
          plan: {
            user,
          },
        },
      });

      if (!found) {
        this.logger.error(MEAL_NOT_FOUND_ERROR_MESSAGE);
        throw new NotFoundException(MEAL_NOT_FOUND_ERROR_MESSAGE);
      }

      found = {
        ...found,
        ...editMealDto,
      };

      const updated = await this.mealsRepository.save(found);

      if (!updated) {
        this.logger.error(MEAL_NOT_UPDATED_ERROR_MESSAGE);
        throw new BadRequestException(MEAL_NOT_UPDATED_ERROR_MESSAGE);
      }

      return updated;
    } catch (error) {
      this.logger.error(error.response.message);
      throw new InternalServerErrorException(error.response.message);
    }
  }

  async remove(id: string, user: User): Promise<void> {
    const MEAL_NOT_FOUND_ERROR_MESSAGE = `Meal "${id}" for user "${user.username}" not found.`;
    const INGREDIENTS_NOT_DELETED_ERROR_MESSAGE = `Failed to delete ingredients of meal "${id}" for user "${user.username}"`;
    const MEAL_NOT_DELETED_ERROR_MESSAGE = `Failed to delete meal "${id}" for user "${user.username}"`;

    try {
      const meal = await this.mealsRepository.findOneBy({
        id,
        day: {
          plan: {
            user,
          },
        },
      });

      if (!meal) {
        this.logger.error(MEAL_NOT_FOUND_ERROR_MESSAGE);
        throw new NotFoundException(MEAL_NOT_FOUND_ERROR_MESSAGE);
      }

      const deletedIngredients = await this.ingredientsRepository.delete({
        meal: { id: meal.id },
      });

      if (!deletedIngredients) {
        this.logger.error(INGREDIENTS_NOT_DELETED_ERROR_MESSAGE);
        throw new BadRequestException(INGREDIENTS_NOT_DELETED_ERROR_MESSAGE);
      }

      const deleted = await this.mealsRepository.delete({ id: meal.id });

      if (!deleted) {
        this.logger.error(MEAL_NOT_DELETED_ERROR_MESSAGE);
        throw new BadRequestException(MEAL_NOT_DELETED_ERROR_MESSAGE);
      }
    } catch (error) {
      this.logger.error(error.response.message);
      throw new InternalServerErrorException(error.response.message);
    }
  }
}

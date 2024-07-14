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

@Injectable()
export class MealsService {
  constructor(
    @Inject('MEALS_REPOSITORY')
    private mealsRepository: Repository<Meal>,
    @Inject('DAYS_REPOSITORY')
    private daysRepository: Repository<Day>,
    @Inject('INGREDIENTS_REPOSITORY')
    private ingredientsRepository: Repository<Ingredient>,
  ) {}
  private logger = new Logger('MealsService');

  async getById(id: string, user: User): Promise<Meal> {
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
        this.logger.error(`Meal with ID ${id} for ${user.username} not found.`);
        throw new NotFoundException(
          `Meal with ID ${id} for ${user.username} not found.`,
        );
      }

      return found;
    } catch {
      this.logger.error(`Meal with ID ${id} for ${user.username} not found.`);
      throw new NotFoundException(
        `Meal with ID ${id} for ${user.username} not found.`,
      );
    }
  }

  async getAll(dayId: string, user: User): Promise<Meal[]> {
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
        this.logger.error(
          `Meals for day ${dayId} of the user ${user.username} not found.`,
        );
        throw new NotFoundException(
          `Meals for day ${dayId} of the user ${user.username} not found.`,
        );
      }

      return found;
    } catch {
      this.logger.error(
        `Meals for day ${dayId} of the user ${user.username} not found.`,
      );
      throw new NotFoundException(
        `Meals for day ${dayId} of the user ${user.username} not found.`,
      );
    }
  }

  async create(
    createMealDto: MealsDto,
    dayId: string,
    user: User,
  ): Promise<Meal> {
    try {
      const foundDay = await this.daysRepository.findOneBy({
        id: dayId,
        plan: {
          user,
        },
      });

      if (!foundDay) {
        this.logger.error(
          `Day for ${user.username} with ID ${dayId} not found.`,
        );
        throw new NotFoundException(
          `Day for ${user.username} with ID ${dayId} not found.`,
        );
      }

      const created = this.mealsRepository.create({
        ...createMealDto,
        day: foundDay,
      });

      if (!created) {
        this.logger.error(
          `Failed to add meal to the day "${dayId}" for user "${user.username}"`,
        );
        throw new BadRequestException(
          `Failed to add meal to the day "${dayId}" for user "${user.username}"`,
        );
      }

      const saved = await this.mealsRepository.save(created);

      if (!saved) {
        this.logger.error(
          `Failed to add meal to the day "${dayId}" for user "${user.username}"`,
        );
        throw new BadRequestException(
          `Failed to add meal to the day "${dayId}" for user "${user.username}"`,
        );
      }

      return saved;
    } catch {
      this.logger.error(
        `Failed to add meal to the day "${dayId}" for user "${user.username}"`,
      );
      throw new InternalServerErrorException(
        `Failed to add meal to the day "${dayId}" for user "${user.username}"`,
      );
    }
  }

  async edit(editMealDto: MealsDto, mealId: string, user: User): Promise<Meal> {
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
        this.logger.error(
          `Failed to get meal: ${mealId} for user "${user.username}"`,
        );
        throw new NotFoundException(
          `Failed to get meal: ${mealId} for user "${user.username}"`,
        );
      }

      found = {
        ...found,
        ...editMealDto,
      };

      const updated = await this.mealsRepository.save(found);

      if (!updated) {
        this.logger.error(
          `Failed to get meal: ${mealId} for user "${user.username}"`,
        );
        throw new BadRequestException(`Failed to update meal: ${mealId}`);
      }

      return updated;
    } catch (error) {
      this.logger.error(
        `Failed to get meal: ${mealId} for user "${user.username}"`,
      );
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string, user: User): Promise<void> {
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
        this.logger.error(
          `Failed to get meal: ${id} for user "${user.username}"`,
        );
        throw new NotFoundException(
          `Failed to get meal: ${id} for user "${user.username}"`,
        );
      }

      const deletedIngredients = await this.ingredientsRepository.delete({
        meal: { id: meal.id },
      });

      if (!deletedIngredients) {
        this.logger.error(
          `Failed to delete ingredients of meal: ${id} for user "${user.username}"`,
        );
        throw new BadRequestException(
          `Failed to delete ingredients of meal "${id}"`,
        );
      }

      const deleted = await this.mealsRepository.delete({ id: meal.id });

      if (!deleted) {
        this.logger.error(
          `Failed to delete meal: ${id} for user "${user.username}"`,
        );
        throw new BadRequestException(`Could not delete meal "${id}"`);
      }
    } catch (error) {
      this.logger.error(
        `Failed to delete meal: ${id} for user "${user.username}"`,
      );
      throw new InternalServerErrorException(error);
    }
  }
}

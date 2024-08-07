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
import { Day } from './day.entity';
import { DayName } from './day.enum';
import { Plan } from 'src/plans/plan.entity';
import { User } from 'src/auth/user.entity';
import { RepositoryType } from 'src/repository.consts';

@Injectable()
export class DaysService {
  constructor(
    @Inject(RepositoryType.DAYS)
    private daysRepository: Repository<Day>,
    @Inject(RepositoryType.PLANS)
    private plansRepository: Repository<Plan>,
  ) {}
  private logger = new Logger('DaysService');

  async getByPlanId(planId: string, user: User): Promise<Day[]> {
    const DAYS_NOT_FOUND_ERROR_MESSAGE = `Days for "${planId}" not found.`;

    try {
      const found = await this.daysRepository.findBy({
        plan: {
          id: planId,
          user,
        },
      });

      if (!found?.length) {
        this.logger.error(DAYS_NOT_FOUND_ERROR_MESSAGE);
        throw new NotFoundException(DAYS_NOT_FOUND_ERROR_MESSAGE);
      }

      return found.sort((a, b) => a.day - b.day);
    } catch (error) {
      this.logger.error(error.response.message);
      throw new InternalServerErrorException(error.response.message);
    }
  }

  async create(planId: string, user: User): Promise<Day[]> {
    const ALREADY_EXISTS_ERROR_MESSAGE = `Days for plan "${planId}" and user "${user.username}" already exists.`;
    const PLAN_NOT_FOUND_ERROR_MESSAGE = `Plan "${planId}" for user "${user.username}" not found.`;
    const FAILED_DAYS_CREATION_ERROR_MESSAGE = `Failed to save days for plan "${planId}" and for user "${user.username}".`;

    try {
      const plan = await this.plansRepository.findOneBy({
        id: planId,
        user,
      });

      if (!plan) {
        this.logger.error(PLAN_NOT_FOUND_ERROR_MESSAGE);
        throw new BadRequestException(PLAN_NOT_FOUND_ERROR_MESSAGE);
      }

      const day = await this.daysRepository.findOneBy({
        plan: {
          id: planId,
          user,
        },
      });

      if (day) {
        this.logger.error(ALREADY_EXISTS_ERROR_MESSAGE);
        throw new ConflictException(ALREADY_EXISTS_ERROR_MESSAGE);
      }

      const days = this.daysRepository.create([
        {
          day: DayName.MONDAY,
          plan,
        },
        {
          day: DayName.TUESDAY,
          plan,
        },
        {
          day: DayName.WEDNESDAY,
          plan,
        },
        {
          day: DayName.THURSDAY,
          plan,
        },
        {
          day: DayName.FRIDAY,
          plan,
        },
        {
          day: DayName.SATURDAY,
          plan,
        },
        {
          day: DayName.SUNDAY,
          plan,
        },
      ]);

      const savedDays = await this.daysRepository.save(days);

      if (!savedDays) {
        this.logger.error(FAILED_DAYS_CREATION_ERROR_MESSAGE);
        throw new BadRequestException(FAILED_DAYS_CREATION_ERROR_MESSAGE);
      }

      return savedDays;
    } catch (error) {
      this.logger.error(error.response.message);
      throw new InternalServerErrorException(error.response.message);
    }
  }
}

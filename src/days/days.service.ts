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

@Injectable()
export class DaysService {
  constructor(
    @Inject('DAYS_REPOSITORY')
    private daysRepository: Repository<Day>,
    @Inject('PLANS_REPOSITORY')
    private plansRepository: Repository<Plan>,
  ) {}
  private logger = new Logger('DaysService');

  async getByPlanId(planId: string, user: User): Promise<Day[]> {
    try {
      const found = await this.daysRepository.findBy({
        plan: {
          id: planId,
          user,
        },
      });

      if (!found?.length)
        throw new NotFoundException(`Days for: ${planId} not found`);

      return found;
    } catch (error) {
      this.logger.error(`Failed to get days for plan: ${planId}`);
      throw new InternalServerErrorException(error);
    }
  }

  async create(planId: string, user: User): Promise<Day[]> {
    try {
      const exist = await this.daysRepository.findOneBy({
        plan: {
          id: planId,
          user,
        },
      });

      if (exist) {
        this.logger.error(
          `Days for plan: ${planId} and user: "${user.username}" already exist`,
        );

        throw new ConflictException(`Days for plan: ${planId} exist`);
      }

      const plan = await this.plansRepository.findOneBy({
        id: planId,
        user,
      });

      if (!plan) {
        this.logger.error(
          `Failed to get plan: ${planId} for user "${user.username}"`,
        );

        throw new BadRequestException(`Plan: ${planId} not found`);
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

      // TODO: Saved in a good order, returns in bad
      const savedDays = await this.daysRepository.save(days);

      console.log(savedDays);

      if (!savedDays) {
        this.logger.error(
          `Failed to fully save the plan: "${plan.name}" for user "${user.username}"`,
        );
        throw new BadRequestException(
          `Plan for the user: ${user.username} not saved`,
        );
      }

      return savedDays;
    } catch (error) {
      this.logger.error(`Failed to get days for plan: ${planId}`);
      throw new InternalServerErrorException(error);
    }
  }
}

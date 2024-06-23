import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Plan } from '../common.entity';
import { Repository } from 'typeorm';
import { RepositoryEnum } from '../../consts';
import { CreatePlanDto } from './dto/create-plan.dto';

@Injectable()
export class PlanService {
  constructor(
    @Inject(RepositoryEnum.PLAN)
    private plansRepository: Repository<Plan>,
  ) {}

  async getPlansByUserId(userId: string): Promise<Plan[]> {
    try {
      const found = await this.plansRepository.findBy({ userId });

      if (!found.length) return [];

      return found;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async createEmptyPlan(
    userId: string,
    { name }: CreatePlanDto,
  ): Promise<Plan> {
    try {
      const plan = new Plan();

      plan.userId = userId;
      plan.name = name;

      const saved = await this.plansRepository.save(plan);

      if (!saved) {
        throw new BadRequestException(`Plan for the user: ${userId} not saved`);
      }

      return saved;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getPlanById(userId: string, id: string): Promise<Plan> {
    try {
      const found = await this.plansRepository.findOneBy({ userId, id });

      if (!found)
        throw new NotFoundException(
          `Plan: ${id} not found for the user: ${userId}`,
        );

      return found;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}

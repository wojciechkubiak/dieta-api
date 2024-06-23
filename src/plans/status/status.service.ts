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
import { UpdatePlanStatusDto } from './dto/update-plan-status.dto';
import { PlanStatus } from '../common.enum';

@Injectable()
export class PlanStatusService {
  constructor(
    @Inject(RepositoryEnum.PLAN)
    private plansRepository: Repository<Plan>,
  ) {}

  async getUserPlansByStatus(
    userId: string,
    status: PlanStatus,
  ): Promise<Plan[]> {
    try {
      const found = await this.plansRepository.findBy({ userId, status });

      if (!found.length)
        throw new NotFoundException(
          `Plans of user with id: ${userId} and status: ${status} not found`,
        );

      return found;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updatePlanStatus(
    userId: string,
    id: string,
    { status }: UpdatePlanStatusDto,
  ): Promise<Plan> {
    try {
      const found = await this.plansRepository.findOneBy({ userId, id });

      if (!found)
        throw new NotFoundException(
          `Plan: ${id} not found for the user: ${userId}`,
        );

      found.status = status;

      const updated = await this.plansRepository.save(found);

      if (!updated)
        throw new BadRequestException(`Failed to update plan: ${id}`);

      return updated;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}

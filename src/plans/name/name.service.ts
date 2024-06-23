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
import { UpdatePlanNameDto } from './dto/update-plan-name.dto';

@Injectable()
export class PlanNameService {
  constructor(
    @Inject(RepositoryEnum.PLAN)
    private plansRepository: Repository<Plan>,
  ) {}

  async updatePlanName(
    userId: string,
    id: string,
    { name }: UpdatePlanNameDto,
  ): Promise<Plan> {
    try {
      const found = await this.plansRepository.findOneBy({ userId, id });

      if (!found)
        throw new NotFoundException(
          `Plan: ${id} not found for the user: ${userId}`,
        );

      found.name = name;

      const updated = await this.plansRepository.save(found);

      if (!updated)
        throw new BadRequestException(`Failed to update plan: ${id}`);

      return updated;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}

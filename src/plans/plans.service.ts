import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Plan } from './plan.entity';
import { Repository } from 'typeorm';
import { RepositoryEnum } from 'src/const';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanStatusDto } from './dto/update-plan-status.dto';
import { UpdatePlanNameDto } from './dto/update-plan-name.dto';

@Injectable()
export class PlansService {
  constructor(
    @Inject(RepositoryEnum.PLAN)
    private plansRepository: Repository<Plan>,
  ) {}

  async getPlansByUserId(userId: string): Promise<Plan[]> {
    const found = await this.plansRepository.findBy({ userId });

    if (!found.length)
      throw new NotFoundException(`Plans of user with id: ${userId} not found`);

    return found;
  }

  async getPlanById(userId: string, id: string): Promise<Plan> {
    const found = await this.plansRepository.findOneBy({ userId, id });

    console.log(found);
    if (!found)
      throw new NotFoundException(
        `Plan: ${id} not found for the user: ${userId}`,
      );

    return found;
  }

  async createEmptyPlan(
    userId: string,
    { name }: CreatePlanDto,
  ): Promise<Plan> {
    const plan = new Plan();

    plan.userId = userId;
    plan.name = name;

    const saved = await this.plansRepository.save(plan);

    if (!saved)
      throw new BadRequestException(`Plan for the user: ${userId} not saved`);

    return saved;
  }

  async updatePlanStatus(
    userId: string,
    id: string,
    { status }: UpdatePlanStatusDto,
  ): Promise<Plan> {
    const found = await this.plansRepository.findOneBy({ userId, id });

    if (!found)
      throw new NotFoundException(
        `Plan: ${id} not found for the user: ${userId}`,
      );

    found.status = status;

    const updated = await this.plansRepository.save(found);

    if (!updated) throw new BadRequestException(`Failed to update plan: ${id}`);

    return updated;
  }

  async updatePlanName(
    userId: string,
    id: string,
    { name }: UpdatePlanNameDto,
  ): Promise<Plan> {
    const found = await this.plansRepository.findOneBy({ userId, id });

    if (!found)
      throw new NotFoundException(
        `Plan: ${id} not found for the user: ${userId}`,
      );

    found.name = name;

    const updated = await this.plansRepository.save(found);

    if (!updated) throw new BadRequestException(`Failed to update plan: ${id}`);

    return updated;
  }
}

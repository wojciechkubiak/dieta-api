import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Plan } from './plan.entity';
import { RepositoryEnum } from '../consts';
import { CreatePlanDto } from './dto/create.dto';
import { UpdateNameDto, UpdateStatusDto } from './dto/update.dto';
import { FilterStatusDto } from './dto/filter.dto';

@Injectable()
export class PlansService {
  constructor(
    @Inject(RepositoryEnum.PLAN)
    private plansRepository: Repository<Plan>,
  ) {}

  async getAll(): Promise<Plan[]> {
    const userId = '1721d2a4-343d-4955-9855-2d4a22c63672';

    try {
      const found = await this.plansRepository.findBy({ userId });

      if (!found.length) return [];

      return found;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getByStatus(query: FilterStatusDto): Promise<Plan> {
    const userId = '1721d2a4-343d-4955-9855-2d4a22c63672';
    console.log(query);
    const { status } = query;

    try {
      const found = await this.plansRepository.findOneBy({
        userId,
        status,
      });

      if (!found)
        throw new NotFoundException(`Plan with status: ${status} not found`);

      return found;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getById(planId: string): Promise<Plan> {
    const userId = '1721d2a4-343d-4955-9855-2d4a22c63672';

    try {
      const found = await this.plansRepository.findOneBy({
        userId,
        id: planId,
      });

      if (!found) throw new NotFoundException(`Plan: ${planId} not found`);

      return found;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async create({ name }: CreatePlanDto): Promise<Plan> {
    const userId = '1721d2a4-343d-4955-9855-2d4a22c63672';

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

  async updateName(id: string, { name }: UpdateNameDto): Promise<Plan> {
    const userId = '1721d2a4-343d-4955-9855-2d4a22c63672';

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

  async updateStatus(id: string, { status }: UpdateStatusDto): Promise<Plan> {
    const userId = '1721d2a4-343d-4955-9855-2d4a22c63672';

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

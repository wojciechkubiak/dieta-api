import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Plan } from './plan.entity';
import { CreatePlanDto } from './dto/create.dto';
import { UpdateNameDto, UpdateStatusDto } from './dto/update.dto';
import { FilterStatusDto } from './dto/filter.dto';
import { User } from '../auth/user.entity';
import { RepositoryEnum } from '../consts';

@Injectable()
export class PlansService {
  constructor(
    @Inject(RepositoryEnum.PLAN)
    private plansRepository: Repository<Plan>,
  ) {}
  private logger = new Logger('PlansService');

  async getAll(user: User): Promise<Plan[]> {
    try {
      const found = await this.plansRepository.findBy({ user });

      if (!found.length) return [];

      return found;
    } catch (error) {
      this.logger.error(`Failed to get all plans for user "${user.username}"`);
      throw new InternalServerErrorException(error);
    }
  }

  async getByStatus(query: FilterStatusDto, user: User): Promise<Plan> {
    const { status } = query;

    try {
      const found = await this.plansRepository.findOneBy({
        status,
        user,
      });

      if (!found)
        throw new NotFoundException(`Plan with status: ${status} not found`);

      return found;
    } catch (error) {
      this.logger.error(
        `Failed to get all plans with status: ${query.status} for user "${user.username}"`,
      );
      throw new InternalServerErrorException(error);
    }
  }

  async getById(planId: string, user: User): Promise<Plan> {
    try {
      const found = await this.plansRepository.findOneBy({
        id: planId,
        user,
      });

      if (!found) {
        this.logger.error(
          `Failed to get plan: ${planId} for user "${user.username}"`,
        );

        throw new BadRequestException(`Plan: ${planId} not found`);
      }

      return found;
    } catch (error) {
      this.logger.error(
        `Failed to get plan: ${planId} for user "${user.username}"`,
      );

      throw new InternalServerErrorException(error);
    }
  }

  async create({ name }: CreatePlanDto, user: User): Promise<Plan> {
    try {
      const plan = this.plansRepository.create({
        name,
        user,
      });

      const savedPlan = await this.plansRepository.save(plan);

      if (!savedPlan) {
        this.logger.error(
          `Failed to fully save the plan: "${plan.name}" for user "${user.username}"`,
        );
        throw new BadRequestException(
          `Plan for the user: ${user.username} not saved`,
        );
      }

      return savedPlan;
    } catch (error) {
      this.logger.error(
        `Failed to save the: "${name}" for user "${user.username}"`,
      );
      throw new InternalServerErrorException(error);
    }
  }

  async updateName(
    id: string,
    { name }: UpdateNameDto,
    user: User,
  ): Promise<Plan> {
    try {
      const found = await this.plansRepository.findOneBy({ id, user });

      if (!found) {
        this.logger.error(
          `Failed to get plan: ${id} for user "${user.username}"`,
        );
        throw new NotFoundException(
          `Plan: ${id} not found for the user: ${user.username}`,
        );
      }

      found.name = name;

      const updated = await this.plansRepository.save(found);

      if (!updated) {
        this.logger.error(
          `Failed to update plan: ${id} with name equal to "${name}" for user "${user.username}"`,
        );
        throw new BadRequestException(`Failed to update plan: ${id}`);
      }

      return updated;
    } catch (error) {
      this.logger.error(
        `Failed to update plan: ${id} with name equal to "${name}" for user "${user.username}"`,
      );
      throw new InternalServerErrorException(error);
    }
  }

  async updateStatus(
    id: string,
    { status }: UpdateStatusDto,
    user: User,
  ): Promise<Plan> {
    try {
      const found = await this.plansRepository.findOneBy({ id, user });

      if (!found) throw new BadRequestException(`Plan: ${id} not found for`);

      found.status = status;

      const updated = await this.plansRepository.save(found);

      if (!updated) {
        this.logger.error(
          `Failed to update plan: ${id} with status equal to "${status}" for user "${user.username}"`,
        );
        throw new BadRequestException(`Failed to update plan: ${id}`);
      }

      return updated;
    } catch (error) {
      this.logger.error(
        `Failed to update plan: ${id} with status equal to "${status}" for user "${user.username}"`,
      );
      throw new InternalServerErrorException(error);
    }
  }
}

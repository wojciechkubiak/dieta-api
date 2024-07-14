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
import { RepositoryType } from 'src/repository.consts';

@Injectable()
export class PlansService {
  constructor(
    @Inject(RepositoryType.PLANS)
    private plansRepository: Repository<Plan>,
  ) {}
  private logger = new Logger('PlansService');

  async getAll(user: User): Promise<Plan[]> {
    const PLANS_NOT_FOUND_ERROR_MESSAGE = `Plans for "${user.username}" not found.`;

    try {
      const found = await this.plansRepository.findBy({ user });

      if (!found.length) {
        this.logger.error(PLANS_NOT_FOUND_ERROR_MESSAGE);
        throw new NotFoundException(PLANS_NOT_FOUND_ERROR_MESSAGE);
      }

      return found;
    } catch (error) {
      this.logger.error(error.response.message);
      throw new InternalServerErrorException(error.response.message);
    }
  }

  async getByStatus(query: FilterStatusDto, user: User): Promise<Plan> {
    const { status } = query;

    const PLANS_NOT_FOUND_ERROR_MESSAGE = `Plans for "${user.username}" and status "${status}" not found.`;

    try {
      const found = await this.plansRepository.findOneBy({
        status,
        user,
      });

      if (!found) {
        this.logger.error(PLANS_NOT_FOUND_ERROR_MESSAGE);
        throw new NotFoundException(PLANS_NOT_FOUND_ERROR_MESSAGE);
      }

      return found;
    } catch (error) {
      this.logger.error(error.response.message);
      throw new InternalServerErrorException(error.response.message);
    }
  }

  async getById(planId: string, user: User): Promise<Plan> {
    const PLAN_NOT_FOUND_ERROR_MESSAGE = `Plan "${planId}" for "${user.username}" not found.`;

    try {
      const found = await this.plansRepository.findOneBy({
        id: planId,
        user,
      });

      if (!found) {
        this.logger.error(PLAN_NOT_FOUND_ERROR_MESSAGE);
        throw new BadRequestException(PLAN_NOT_FOUND_ERROR_MESSAGE);
      }

      return found;
    } catch (error) {
      this.logger.error(error.response.message);
      throw new InternalServerErrorException(error.response.message);
    }
  }

  async create({ name }: CreatePlanDto, user: User): Promise<Plan> {
    const FAILED_TO_SAVE_PLAN_ERROR_MESSAGE = `Failed to create the plan "${name}" for user "${user.username}".`;

    try {
      const plan = this.plansRepository.create({
        name,
        user,
      });

      const savedPlan = await this.plansRepository.save(plan);

      if (!savedPlan) {
        this.logger.error(FAILED_TO_SAVE_PLAN_ERROR_MESSAGE);
        throw new BadRequestException(FAILED_TO_SAVE_PLAN_ERROR_MESSAGE);
      }

      return savedPlan;
    } catch (error) {
      this.logger.error(error.response.message);
      throw new InternalServerErrorException(error.response.message);
    }
  }

  async updateName(
    id: string,
    { name }: UpdateNameDto,
    user: User,
  ): Promise<Plan> {
    const PLAN_NOT_FOUND_ERROR_MESSAGE = `Plan "${id}" for "${user.username}" not found.`;
    const FAILED_TO_UPDATE_NAME_ERROR_MESSAGE = `Failed to update plan "${id}" with name "${name}" for user "${user.username}".`;

    try {
      const found = await this.plansRepository.findOneBy({ id, user });

      if (!found) {
        this.logger.error(PLAN_NOT_FOUND_ERROR_MESSAGE);
        throw new NotFoundException(PLAN_NOT_FOUND_ERROR_MESSAGE);
      }

      found.name = name;

      const updated = await this.plansRepository.save(found);

      if (!updated) {
        this.logger.error(FAILED_TO_UPDATE_NAME_ERROR_MESSAGE);
        throw new BadRequestException(FAILED_TO_UPDATE_NAME_ERROR_MESSAGE);
      }

      return updated;
    } catch (error) {
      this.logger.error(error.response.message);
      throw new InternalServerErrorException(error.response.message);
    }
  }

  async updateStatus(
    id: string,
    { status }: UpdateStatusDto,
    user: User,
  ): Promise<Plan> {
    const PLAN_NOT_FOUND_ERROR_MESSAGE = `Plan "${id}" for "${user.username}" not found.`;
    const FAILED_TO_UPDATE_NAME_ERROR_MESSAGE = `Failed to update plan "${id}" with status "${status}" for user "${user.username}".`;

    try {
      const found = await this.plansRepository.findOneBy({ id, user });

      if (!found) {
        this.logger.error(PLAN_NOT_FOUND_ERROR_MESSAGE);
        throw new NotFoundException(PLAN_NOT_FOUND_ERROR_MESSAGE);
      }

      found.status = status;

      const updated = await this.plansRepository.save(found);

      if (!updated) {
        this.logger.error(FAILED_TO_UPDATE_NAME_ERROR_MESSAGE);
        throw new BadRequestException(FAILED_TO_UPDATE_NAME_ERROR_MESSAGE);
      }

      return updated;
    } catch (error) {
      this.logger.error(error.response.message);
      throw new InternalServerErrorException(error.response.message);
    }
  }
}

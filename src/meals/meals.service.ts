import { Meal } from './meal.entity';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class MealsService {
  constructor(
    @Inject('MEALS_REPOSITORY')
    private mealsRepository: Repository<Meal>,
  ) {}
  private logger = new Logger('MealsService');

  async getById(): Promise<any> {
    return;
  }

  async getAll(): Promise<any> {
    return;
  }

  async create(): Promise<any> {
    return;
  }

  async edit(): Promise<any> {
    return;
  }

  async remove(): Promise<any> {
    return;
  }
}

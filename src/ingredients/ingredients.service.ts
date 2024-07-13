import { Ingredient } from './ingredient.entity';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class MealsService {
  constructor(
    @Inject('INGREDIENTS_REPOSITORY')
    private ingredientsRepository: Repository<Ingredient>,
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

import { Measure } from './measure.entity';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class MeasuresService {
  constructor(
    @Inject('MEASURES_REPOSITORY')
    private measuresRepository: Repository<Measure>,
  ) {}
  private logger = new Logger('MeasuresService');

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

import { DataSource } from 'typeorm';
import { Plan } from './plan.entity';
import { RepositoryEnum } from '../consts';

export const plansProviders = [
  {
    provide: RepositoryEnum.PLAN,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Plan),
    inject: ['DATA_SOURCE'],
  },
];

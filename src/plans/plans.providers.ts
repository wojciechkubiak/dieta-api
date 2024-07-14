import { DataSource } from 'typeorm';
import { Plan } from './plan.entity';
import { RepositoryType } from 'src/repository.consts';

export const plansProviders = [
  {
    provide: RepositoryType.PLANS,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Plan),
    inject: ['DATA_SOURCE'],
  },
];

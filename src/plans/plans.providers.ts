import { DataSource } from 'typeorm';
import { Plan } from './plan.entity';

export const plansProviders = [
  {
    provide: 'PLANS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Plan),
    inject: ['DATA_SOURCE'],
  },
];

import { DataSource } from 'typeorm';
import { Plan } from './plan.entity';
import { RepositoryEnum, SourceEnum } from 'src/consts';

export const planProviders = [
  {
    provide: RepositoryEnum.PLAN,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Plan),
    inject: [SourceEnum.DATA],
  },
];

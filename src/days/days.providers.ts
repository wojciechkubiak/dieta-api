import { DataSource } from 'typeorm';
import { Day } from './day.entity';
import { RepositoryEnum } from '../consts';

export const daysProviders = [
  {
    provide: RepositoryEnum.DAY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Day),
    inject: ['DATA_SOURCE'],
  },
];

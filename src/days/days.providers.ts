import { DataSource } from 'typeorm';
import { Day } from './day.entity';
import { RepositoryType } from 'src/repository.consts';

export const daysProviders = [
  {
    provide: RepositoryType.DAYS,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Day),
    inject: ['DATA_SOURCE'],
  },
];

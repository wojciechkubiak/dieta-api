import { DataSource } from 'typeorm';
import { Measure } from './measure.entity';
import { RepositoryType } from 'src/repository.consts';

export const measureProviders = [
  {
    provide: RepositoryType.MEASURES,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Measure),
    inject: ['DATA_SOURCE'],
  },
];

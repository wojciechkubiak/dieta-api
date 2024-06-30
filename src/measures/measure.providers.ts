import { DataSource } from 'typeorm';
import { Measure } from './measure.entity';
import { RepositoryEnum } from 'src/consts';

export const measureProviders = [
  {
    provide: RepositoryEnum.MEASURE,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Measure),
    inject: ['DATA_SOURCE'],
  },
];

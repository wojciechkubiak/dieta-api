import { DataSource } from 'typeorm';
import { Measure } from './measure.entity';
import { RepositoryEnum, SourceEnum } from 'src/consts';

export const measureProviders = [
  {
    provide: RepositoryEnum.MEASURE,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Measure),
    inject: [SourceEnum.DATA],
  },
];

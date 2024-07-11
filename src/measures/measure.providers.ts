import { DataSource } from 'typeorm';
import { Measure } from './measure.entity';

export const measureProviders = [
  {
    provide: 'MEASURE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Measure),
    inject: ['DATA_SOURCE'],
  },
];

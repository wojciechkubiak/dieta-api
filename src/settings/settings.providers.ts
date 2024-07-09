import { DataSource } from 'typeorm';
import { Settings } from './settings.entity';
import { RepositoryEnum } from '../consts';

export const settingsProviders = [
  {
    provide: RepositoryEnum.SETTINGS,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Settings),
    inject: ['DATA_SOURCE'],
  },
];

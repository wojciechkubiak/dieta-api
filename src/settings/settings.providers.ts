import { DataSource } from 'typeorm';
import { Settings } from './settings.entity';
import { RepositoryType } from 'src/repository.consts';

export const settingsProviders = [
  {
    provide: RepositoryType.SETTINGS,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Settings),
    inject: ['DATA_SOURCE'],
  },
];

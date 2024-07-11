import { DataSource } from 'typeorm';
import { Settings } from './settings.entity';

export const settingsProviders = [
  {
    provide: 'SETTINGS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Settings),
    inject: ['DATA_SOURCE'],
  },
];

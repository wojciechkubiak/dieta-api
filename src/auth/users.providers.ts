import { DataSource } from 'typeorm';
import { User } from './user.entity';
import { RepositoryEnum } from '../consts';

export const usersProviders = [
  {
    provide: RepositoryEnum.USER,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];

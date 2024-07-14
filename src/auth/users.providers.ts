import { DataSource } from 'typeorm';
import { User } from './user.entity';
import { RepositoryType } from 'src/repository.consts';

export const usersProviders = [
  {
    provide: RepositoryType.USERS,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];

import { DataSource } from 'typeorm';
import { Category } from './category.entity';
import { RepositoryType } from 'src/repository.consts';

export const categoriesProviders = [
  {
    provide: RepositoryType.CATEGORIES,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Category),
    inject: ['DATA_SOURCE'],
  },
];

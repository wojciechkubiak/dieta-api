import { DataSource } from 'typeorm';
import { Ingredient } from './ingredient.entity';
import { RepositoryType } from 'src/repository.consts';

export const ingredientProviders = [
  {
    provide: RepositoryType.INGREDIENTS,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Ingredient),
    inject: ['DATA_SOURCE'],
  },
];

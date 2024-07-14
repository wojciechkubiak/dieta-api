import { DataSource } from 'typeorm';
import { Meal } from './meal.entity';
import { RepositoryType } from 'src/repository.consts';

export const mealsProviders = [
  {
    provide: RepositoryType.MEALS,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Meal),
    inject: ['DATA_SOURCE'],
  },
];

import { DataSource } from 'typeorm';
import { Meal } from './meal.entity';

export const mealsProviders = [
  {
    provide: 'MEALS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Meal),
    inject: ['DATA_SOURCE'],
  },
];

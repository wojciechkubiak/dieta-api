import { DataSource } from 'typeorm';
import { Meal } from './meal.entity';

export const mealProviders = [
  {
    provide: 'INGREDIENT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Meal),
    inject: ['DATA_SOURCE'],
  },
];

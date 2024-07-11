import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { mealProviders } from './meal.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...mealProviders],
})
export class MealsModule {}

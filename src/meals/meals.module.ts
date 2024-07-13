import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { mealsProviders } from './meals.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...mealsProviders],
})
export class MealsModule {}

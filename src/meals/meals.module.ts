import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { mealsProviders } from './meals.providers';
import { AuthModule } from 'src/auth/auth.module';
import { MealsController } from './meals.controller';
import { MealsService } from './meals.service';
import { daysProviders } from 'src/days/days.providers';
import { ingredientProviders } from 'src/ingredients/ingredient.providers';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [MealsController],
  providers: [
    MealsService,
    ...mealsProviders,
    ...daysProviders,
    ...ingredientProviders,
  ],
})
export class MealsModule {}

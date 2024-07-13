import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ingredientProviders } from './ingredient.providers';
import { mealsProviders } from 'src/meals/meals.providers';
import { AuthModule } from 'src/auth/auth.module';
import { IngredientsController } from './ingredients.controller';
import { IngredientsService } from './ingredients.service';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [IngredientsController],
  providers: [IngredientsService, ...ingredientProviders, ...mealsProviders],
})
export class IngredientsModule {}

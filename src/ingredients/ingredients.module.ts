import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ingredientProviders } from './ingredient.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...ingredientProviders],
})
export class IngredientsModule {}

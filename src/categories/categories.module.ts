import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';

import { AuthModule } from '../auth/auth.module';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { categoriesProviders } from './cetegories.providers';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [CategoriesController],
  providers: [CategoriesService, ...categoriesProviders],
})
export class CategoriesModule {}

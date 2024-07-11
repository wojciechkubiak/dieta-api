import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { categoryProviders } from './cetegory.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...categoryProviders],
})
export class CategoriesModule {}

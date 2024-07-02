import { Module } from '@nestjs/common';
import { daysProviders } from './days.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [...daysProviders],
})
export class DaysModule {}

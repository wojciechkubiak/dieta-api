import { measureProviders } from './measure.providers';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...measureProviders],
})
export class MeasuresModule {}

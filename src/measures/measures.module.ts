import { measureProviders } from './measure.providers';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...measureProviders],
})
export class MeasuresModule {}

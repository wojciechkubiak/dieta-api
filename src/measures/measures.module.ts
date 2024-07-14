import { measureProviders } from './measure.providers';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { MeasuresController } from './measures.controller';
import { MeasuresService } from './measures.service';

@Module({
  imports: [DatabaseModule],
  controllers: [MeasuresController],
  providers: [MeasuresService, ...measureProviders],
})
export class MeasuresModule {}

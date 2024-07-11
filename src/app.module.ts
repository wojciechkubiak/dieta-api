import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlansModule } from './plans/plans.module';
import { MeasuresModule } from './measures/measures.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { DaysModule } from './days/days.module';
import { SettingsModule } from './settings/settings.module';
import { MealsModule } from './meals/meals.module';
import { IngredientsModule } from './ingredients/ingredients.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    SettingsModule,
    MeasuresModule,
    PlansModule,
    DaysModule,
    MealsModule,
    IngredientsModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlansModule } from './plans/plans.module';
import { UsersModule } from './users/users.module';
import { MeasuresModule } from './measures/measures.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.example',
    }),
    DatabaseModule,
    PlansModule,
    UsersModule,
    MeasuresModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from '../database/database.module';
import { usersProviders } from './users.providers';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthTokenStrategy } from './jwt-auth-token.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_KEY'),
        signOptions: {
          expiresIn: 86400,
        },
      }),
      global: true,
      inject: [ConfigService],
    }),
    ConfigModule,
    DatabaseModule,
  ],
  providers: [...usersProviders, JwtAuthTokenStrategy, AuthService],
  controllers: [AuthController],
  exports: [JwtAuthTokenStrategy, PassportModule],
})
export class AuthModule {}

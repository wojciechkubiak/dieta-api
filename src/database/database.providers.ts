import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { SourceEnum } from 'src/const';

export const databaseProviders = [
  {
    inject: [ConfigService],
    provide: SourceEnum.DATA,
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];

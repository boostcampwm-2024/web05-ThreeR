import { Module } from '@nestjs/common';
import { winstonModule } from './common/logger/logger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { loadDBSetting } from './common/database/load.config';
import { RedisModule } from './redis/redis.module';
import { RssModule } from './rss/rss.module'; // RssModule만 import

@Module({
  imports: [
    winstonModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
          process.env.ENV_PATH ||
          `${process.cwd()}/configs/.env.db.${process.env.NODE_ENV === 'test' ? 'test' : 'production'}`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
          loadDBSetting(configService),
    }),
    RedisModule,
    RssModule, // RssModule을 임포트하여 RssService와 RssRepository를 사용 가능하게 설정
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

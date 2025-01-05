import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { loadDBSetting } from './common/database/load.config';
import { AdminModule } from './admin/admin.module';
import { RedisModule } from './common/redis/redis.module';
import { RssModule } from './rss/rss.module';
import { FeedModule } from './feed/feed.module';
import { WinstonLoggerModule } from './common/logger/logger.module';
import { ChatModule } from './chat/chat.module';
import { StatisticModule } from './statistic/statistic.module';
@Module({
  imports: [
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
    AdminModule,
    RedisModule,
    WinstonLoggerModule,
    RssModule,
    FeedModule,
    ChatModule,
    StatisticModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

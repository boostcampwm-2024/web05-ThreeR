import { Module } from '@nestjs/common';
import { winstonModule } from './common/logger/logger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { loadDBSetting } from './common/database/load.config';
import { AccountModule } from './account/account.module';
import { RedisModule } from './redis/redis.module';
import { RssModule } from './rss/rss.module';
import { FeedModule } from './feed/feed.module';

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
    AccountModule,
    RedisModule,
    RssModule,
    FeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

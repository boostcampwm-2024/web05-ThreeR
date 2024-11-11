import { Module } from '@nestjs/common';
import { winstonModule } from './common/logger/logger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { loadDBSetting } from './common/database/load.config';

@Module({
  imports: [
    winstonModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/configs/.env.db.${process.env.NODE_ENV === 'test' ? 'test' : 'production'}`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        loadDBSetting(configService),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

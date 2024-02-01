import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import {
  ConfigService,
  mainConfig,
  pinoConfig,
  TypeOrmLogger,
} from '@adventure';
import { Logger, LoggerModule } from 'nestjs-pino';
import { ConfigService as BaseConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [mainConfig],
      isGlobal: true,
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [BaseConfigService],
      useFactory: (config: ConfigService) => {
        return config.get('pino');
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [BaseConfigService],
      extraProviders: [TypeOrmLogger],
      useFactory: (config: ConfigService) => {
        const typeOrmConfig = config.get('typeOrm') as TypeOrmModuleOptions;
        return {
          ...typeOrmConfig,
          logger: new TypeOrmLogger(),
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [ConfigService, AppService],
})
export class AppModule {}

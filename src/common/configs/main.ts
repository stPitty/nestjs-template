import { Inject, Injectable } from '@nestjs/common';
import { ConfigService as BaseService } from '@nestjs/config';
import { IPinoLevel, pinoConfig } from './pino';

const requiredKeys: string[] = [
  'PG_HOST',
  'PG_PORT',
  'PG_USERNAME',
  'PG_PASSWORD',
  'PG_DATABASE',
];

export const mainConfig = () => {
  requiredKeys.forEach((key) => {
    if (!(key in process.env)) {
      throw new Error(`Не установленна переменна окружения ${key}`);
    }
  });

  return {
    mainService: {
      host: process.env.MAIN_SERVICE_HOST ?? 'localhost',
      port: +process.env.MAIN_SERVICE_PORT ?? 8000,
    },
    pino: pinoConfig({
      level: (process.env.PINO_LEVEL as IPinoLevel) ?? 'info',
    }),
    typeOrm: {
      type: 'postgres',
      entities: ['../entities'],
      synchronize: true,
      host: process.env.PG_HOST!,
      port: +process.env.PG_PORT,
      username: process.env.PG_USERNAME!,
      password: process.env.PG_PASSWORD!,
      database: process.env.PG_DATABASE!,
    },
  };
};

export type IMainConfig = ReturnType<typeof mainConfig>;

@Injectable()
export class ConfigService {
  @Inject(BaseService)
  configService: BaseService;

  get<T extends keyof IMainConfig>(
    propertyPath: T,
    ...args: any[]
  ): IMainConfig[T] {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return this.configService.get(propertyPath, ...args) as IMainConfig[T];
  }
}

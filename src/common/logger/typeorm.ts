import { Injectable, Logger } from '@nestjs/common';
import { Logger as TypeOrmBaseLogger } from 'typeorm';
import { QueryRunner } from 'typeorm/query-runner/QueryRunner';

@Injectable()
export class TypeOrmLogger implements TypeOrmBaseLogger {
  private readonly logger = new Logger('TypeORM');

  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner): any {
    const parameter =
      parameters && parameters.length ? `, parameters: [${parameters}]` : '';

    this.logger.debug({
      msg: undefined,
      query: `query: [${query}]${parameter}`,
    });
  }
  logQueryError(
    error: string | Error,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ): any {
    const parameter =
      parameters && parameters.length ? `, parameters: [${parameters}]` : '';

    this.logger.error({
      msg: error,
      query: `query: [${query}]${parameter}`,
    });
  }

  logQuerySlow(
    time: number,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ): any {
    const parameter =
      parameters && parameters.length ? `, parameters: [${parameters}]` : '';

    this.logger.warn({
      msg: `query is slow, time: ${time}`,
      query: `query: [${query}], parameters: ${parameters}`,
    });
  }
  logSchemaBuild(message: string, queryRunner?: QueryRunner): any {
    this.logger.debug(message);
  }
  logMigration(message: string, queryRunner?: QueryRunner): any {
    this.logger.log(message);
  }
  log(
    level: 'log' | 'info' | 'warn',
    message: any,
    queryRunner?: QueryRunner,
  ): any {
    switch (level) {
      case 'log':
      case 'info':
        this.logger.log(message);
        break;
      case 'warn':
        this.logger.warn(message);
    }
  }
}

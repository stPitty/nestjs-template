import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@adventure';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const logger = app.get(Logger);
  app.useLogger(logger);

  const { port, host } = app.get(ConfigService).get('mainService');
  await app.listen(port, host);
  const url = await app.getUrl();

  logger.log({
    msg: `Application is running on: ${url}`,
    context: 'NestApplication',
  });
}
bootstrap();

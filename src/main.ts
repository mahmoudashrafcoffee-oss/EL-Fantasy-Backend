import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { AppModule } from './app.module.js';
import { RedisIoAdapter } from './realtime/redis-io.adapter.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  // Observability
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  // Security setups
  app.use(helmet());
  app.enableCors();

  // Global Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Realtime Setup
  // const redisIoAdapter = new RedisIoAdapter(app, process.env.REDIS_URL || 'redis://localhost:6379');
  // await redisIoAdapter.connectToRedis();
  // app.useWebSocketAdapter(redisIoAdapter);

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  
  app.get(Logger).log(`🚀 Server running on http://localhost:${port}`);
}
await bootstrap();

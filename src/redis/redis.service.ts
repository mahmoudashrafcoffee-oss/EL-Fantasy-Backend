import { Injectable, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService extends Redis implements OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);

  constructor(private configService: ConfigService) {
    super(configService.get<string>('REDIS_URL', 'redis://localhost:6379'));

    this.on('connect', () => {
      this.logger.log('Connected to Redis successfully');
    });

    this.on('error', (err) => {
      this.logger.error(`Redis error: ${err}`);
    });
  }

  onModuleDestroy() {
    this.disconnect();
  }
}

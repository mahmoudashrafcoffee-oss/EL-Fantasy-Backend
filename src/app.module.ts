import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { CacheModule } from '@nestjs/cache-manager';
import { LoggerModule } from 'nestjs-pino';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { RedisModule } from './redis/redis.module.js';
import { ExternalDataModule } from './external-data/external-data.module.js';
import { SyncEngineModule } from './sync-engine/sync-engine.module.js';
import { FantasyEngineModule } from './fantasy-engine/fantasy-engine.module.js';
import { PointsEngineModule } from './points-engine/points-engine.module.js';
import { RealtimeModule } from './realtime/realtime.module.js';
import { redisStore } from 'cache-manager-redis-yet';
import { AuditLogsModule } from './audit-logs/audit-logs.module.js';
import { AuthModule } from './auth/auth.module.js';
import { TeamsModule } from './teams/teams.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development', '.env'],
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
            colorize: true,
          },
        },
      },
    }),
    PrometheusModule.register(),
    // CacheModule.registerAsync({
    //   isGlobal: true,
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => {
    //     const store = await redisStore({
    //       url: configService.get<string>('REDIS_URL'),
    //     });
    //     return {
    //       store: store as unknown as any,
    //     };
    //   },
    // }),
    // BullModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => {
    //     const redisUrl = configService.get<string>('REDIS_URL');
    //     const url = new URL(redisUrl!);
    //     return {
    //       connection: {
    //         host: url.hostname,
    //         port: parseInt(url.port, 10) || 6379,
    //       },
    //     };
    //   },
    // }),
    PrismaModule,
    // RedisModule,
    ExternalDataModule,
    SyncEngineModule,
    FantasyEngineModule,
    PointsEngineModule,
    RealtimeModule,
    AuditLogsModule,
    AuthModule,
    TeamsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

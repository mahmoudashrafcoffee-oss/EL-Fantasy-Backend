var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { ExternalDataModule } from './external-data/external-data.module.js';
import { SyncEngineModule } from './sync-engine/sync-engine.module.js';
import { FantasyEngineModule } from './fantasy-engine/fantasy-engine.module.js';
import { PointsEngineModule } from './points-engine/points-engine.module.js';
import { RealtimeModule } from './realtime/realtime.module.js';
import { AuditLogsModule } from './audit-logs/audit-logs.module.js';
import { AuthModule } from './auth/auth.module.js';
import { TeamsModule } from './teams/teams.module.js';
let AppModule = class AppModule {
};
AppModule = __decorate([
    Module({
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
            PrismaModule,
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
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map
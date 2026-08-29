import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { INestApplication } from '@nestjs/common';
export declare class RedisIoAdapter extends IoAdapter {
    private redisUrl;
    private adapterConstructor;
    constructor(app: INestApplication, redisUrl: string);
    connectToRedis(): Promise<void>;
    createIOServer(port: number, options?: ServerOptions): any;
}

import { IoAdapter } from '@nestjs/platform-socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { Redis } from 'ioredis';
export class RedisIoAdapter extends IoAdapter {
    redisUrl;
    adapterConstructor;
    constructor(app, redisUrl) {
        super(app);
        this.redisUrl = redisUrl;
    }
    async connectToRedis() {
        const pubClient = new Redis(this.redisUrl);
        const subClient = pubClient.duplicate();
        await Promise.all([pubClient.connect().catch(() => { }), subClient.connect().catch(() => { })]);
        this.adapterConstructor = createAdapter(pubClient, subClient);
    }
    createIOServer(port, options) {
        const server = super.createIOServer(port, options);
        server.adapter(this.adapterConstructor);
        return server;
    }
}
//# sourceMappingURL=redis-io.adapter.js.map
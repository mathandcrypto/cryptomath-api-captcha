import { Module, Provider } from '@nestjs/common';
import { RedisConfigModule } from '@config/redis/config.module';
import { RedisConfigService } from '@config/redis/config.service';
import Redis from 'ioredis';

const redisConnectionFactory = {
  provide: 'REDIS_CONNECTION',
  inject: [RedisConfigService],
  useFactory: (redisConfigService: RedisConfigService) => {
    const { host, port } = redisConfigService;

    return new Redis({ host, port });
  },
} as Provider;

@Module({
  imports: [RedisConfigModule],
  providers: [redisConnectionFactory],
  exports: [redisConnectionFactory],
})
export class RedisModule {}

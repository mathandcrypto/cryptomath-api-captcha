import { registerAs } from '@nestjs/config';
import { RedisConfig } from './interfaces/redis-config.interface';

export default registerAs<RedisConfig>('redis', () => ({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
}));

import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from '@providers/prisma/prisma.module';
import { RedisModule } from '@providers/redis/redis.module';
import { CaptchaService } from './captcha.service';
import { CaptchaController } from './captcha.controller';

@Module({
  imports: [ScheduleModule.forRoot(), PrismaModule, RedisModule],
  controllers: [CaptchaController],
  providers: [CaptchaService],
})
export class CaptchaModule {}

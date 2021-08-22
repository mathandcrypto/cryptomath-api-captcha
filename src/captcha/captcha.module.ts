import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from '@providers/prisma/prisma.module';
import { CaptchaService } from './captcha.service';
import { CaptchaController } from './captcha.controller';

@Module({
  imports: [ScheduleModule.forRoot(), PrismaModule],
  controllers: [CaptchaController],
  providers: [CaptchaService],
})
export class CaptchaModule {}

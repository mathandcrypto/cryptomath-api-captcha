import { Module } from '@nestjs/common';
import { AppConfigModule } from '@config/app/config.module';
import { CaptchaModule } from '@captcha/captcha.module';

@Module({
  imports: [AppConfigModule, CaptchaModule],
})
export class AppModule {}

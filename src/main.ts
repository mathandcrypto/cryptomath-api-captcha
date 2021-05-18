import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CAPTCHA_PACKAGE_NAME } from 'cryptomath-api-proto/proto/build/captcha';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: CAPTCHA_PACKAGE_NAME,
        protoPath: join(
          process.cwd(),
          'node_modules/cryptomath-api-proto/proto/captcha.proto',
        ),
        url: 'localhost:5003',
      },
    },
  );
  app.listen(() => console.log('Captcha microservice is listening'));
}
bootstrap();

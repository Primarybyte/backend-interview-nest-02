import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/AppModule';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  {
    const config: ConfigService = app.get(ConfigService);

    const hostname = config.get('APP_HOST') || 'localhost';
    const port = +config.get('APP_PORT') || 3000;
    await app.listen(port, hostname);
  }
}

bootstrap();

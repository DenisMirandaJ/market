import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  console.log(port);
  await app
    .listen(port || 3103)
    .then(() => console.log(`Running on port ${port || 3103}`));
}
bootstrap();

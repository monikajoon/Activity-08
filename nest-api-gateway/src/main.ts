// File Path: code/Activity-08/nest-api-gateway/src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // Create an HTTP server
  const app = await NestFactory.create(AppModule);

  // Set the port for the HTTP server
  await app.listen(3000);
  console.log('HTTP server is running on http://localhost:3000');
}

bootstrap();

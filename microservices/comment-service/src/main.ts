import { NestFactory } from '@nestjs/core';
import { CommentModule } from './comment.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(CommentModule, {
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 8889,
    },
  });
  await app.listen();
}
bootstrap();

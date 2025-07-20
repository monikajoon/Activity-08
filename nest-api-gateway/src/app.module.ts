// File Path: code/Activity-08/nest-api-gateway/src/app.module.ts

import { Module } from '@nestjs/common';
import { AppController, BooksController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { join } from 'path';

@Module({
  imports: [
    HttpModule,
    ClientsModule.register([
      {
        name: 'SERVICE_BOOK',
        transport: Transport.GRPC,
        options: {
          package: 'book',
          protoPath: join(__dirname, '../src/proto/book.proto'),
          url: 'localhost:5000', // Ensure this matches the gRPC server's address
        },
      },
     {
        name: 'SERVICE_COMMENT',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 8889,
        },
      },
    ]),
  ],
  controllers: [AppController, BooksController],
  providers: [AppService],
})
export class AppModule {}

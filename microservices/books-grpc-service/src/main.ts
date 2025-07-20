   // src/main.ts
   import { NestFactory } from '@nestjs/core';
   import { MicroserviceOptions, Transport } from '@nestjs/microservices';
   import { AppModule } from './book.module';
   import { join } from 'path';

   async function bootstrap() {
     const app = await NestFactory.createMicroservice<MicroserviceOptions>(
       AppModule,
       {
         transport: Transport.GRPC,
         options: {
           package: 'book', // Matches the package in .proto
           protoPath: join(__dirname, '../src/proto/book.proto'), // Path to your .proto file
         },
       },
     );
     await app.listen();
   }
   bootstrap();
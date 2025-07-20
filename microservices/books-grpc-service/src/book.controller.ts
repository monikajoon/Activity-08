import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { BookService } from './book.service';
import { Book, GetBookRequest } from './proto/book';

@Controller()
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @GrpcMethod('BookService', 'getBook')
  getBook(data: GetBookRequest, metadata: any): Book {
    return this.bookService.getBook(data);
  }
}

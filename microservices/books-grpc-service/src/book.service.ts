   // src/user/user.service.ts
   import { Injectable, NotFoundException } from '@nestjs/common';
   import { Book, GetBookRequest } from './book.interface';

   @Injectable()
   export class BookService {
    private readonly books: Book[] = [
    { id: '1', name: '1984', isAvailable: true },
    { id: '2', name: 'Brave New World', isAvailable: false },
  ];

  getBook(data: GetBookRequest): Book {
    const book = this.books.find(book => book.id === data.id);
    if (!book) {
      throw new NotFoundException(`Book with id ${data.id} not found`);
    }
    return book;
  }
   }
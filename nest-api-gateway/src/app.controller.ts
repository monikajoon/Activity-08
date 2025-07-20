import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, Observable } from 'rxjs';
import { AppService } from './app.service';
import { Book } from './interfaces/book.interface';
import { ClientGrpc } from '@nestjs/microservices';


@Controller()
export class AppController {
  constructor(
    private readonly userServiceClient: AppService,
    private readonly commentServiceClient: AppService,
  ) {}

  @Get('users')
  getUsers(): Promise<any> {
    try {
      return this.userServiceClient.getUsers();
     
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Failed to fetch users');
    }
  }

  @Get('comments')
  getComments() {
    return this.commentServiceClient.getComments();
  }
  
}

interface BookService {
  getBook(data: { id: string }): Observable<Book>;
}

@Controller('books')
export class BooksController {
  private bookService: BookService;

  constructor(@Inject('SERVICE_BOOK') private client: ClientGrpc) {}

  onModuleInit() {
    this.bookService = this.client.getService<BookService>('BookService');
  }

  @Get(':id')
  getBook(@Param('id') id: string): Observable<Book> {
    return this.bookService.getBook({ id });
  }
}

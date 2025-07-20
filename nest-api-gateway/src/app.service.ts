// File Path: code/Activity-08/nest-api-gateway/src/app.service.ts

import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Book } from './interfaces/book.interface';

@Injectable()
export class AppService {
  constructor(
    private readonly userServiceClient: HttpService,
    @Inject('SERVICE_COMMENT') private readonly commentServiceClient: ClientProxy,
  ) {}

  getComments(): Observable<any> {
    return this.commentServiceClient.send({ cmd: 'get_comments' }, {}).pipe(
      catchError(err => {
        console.error('Error fetching comments:', err);
        return throwError(() => new Error('Failed to fetch comments'));
      }),
    );
  }

  async getUsers(): Promise<any> {
    try {
      const response = await firstValueFrom(this.userServiceClient.get('http://localhost:3002/users'));
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Failed to fetch users');
    }
  }
}



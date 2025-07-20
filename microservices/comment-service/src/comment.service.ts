import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentService {
  private comments = [
    { id: 1, text: 'This is a great post!' },
    { id: 2, text: 'Thanks for sharing!' },
  ];

  getComments() {
    return this.comments;
  }
}

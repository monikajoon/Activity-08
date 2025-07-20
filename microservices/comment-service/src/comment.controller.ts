import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CommentService } from './comment.service';

@Controller()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @MessagePattern({ cmd: 'get_comments' })
  getComments() {
    return this.commentService.getComments();
  }
}

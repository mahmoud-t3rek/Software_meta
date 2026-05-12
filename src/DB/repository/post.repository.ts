import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DbRepository } from './db.repository';
import { Post } from '../models/post.model';


@Injectable()
export class PostRepository extends DbRepository<Post> {
  constructor(
    @InjectRepository(Post)
    repo: Repository<Post>,
  ) {
    super(repo);
  }
}

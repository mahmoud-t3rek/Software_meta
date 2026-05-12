import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/user.model';
import { DbRepository } from './db.repository';


@Injectable()
export class UserRepository extends DbRepository<User> {
  constructor(
    @InjectRepository(User)
    repo: Repository<User>,
  ) {
    super(repo);
  }
}

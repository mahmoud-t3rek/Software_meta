import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DbRepository } from './db.repository';
import { Token } from '../models/token.model';


@Injectable()
export class TokenRepository extends DbRepository<Token> {
  constructor(
    @InjectRepository(Token)
    repo: Repository<Token>,
  ) {
    super(repo);
  }
}

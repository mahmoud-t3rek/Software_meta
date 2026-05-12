
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post, User } from '../models';
import { Token } from '../models/token.model';

export const Connection = () =>
  TypeOrmModule.forRoot({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [User, Post, Token],
  synchronize: true,
});

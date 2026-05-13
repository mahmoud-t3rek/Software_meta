
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post, User } from '../models';

export const Connection = () =>
  TypeOrmModule.forRoot({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [User, Post],
  synchronize: true,
});

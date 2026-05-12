 import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Post } from './post.model';


@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;  

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];
} 
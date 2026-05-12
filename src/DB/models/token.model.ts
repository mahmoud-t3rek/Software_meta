import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity({ name: 'TokensTable' })
@Index('idx_tokens_jti', ['jti'])
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
    nullable: false,
  })
  jti: string;

  @Column({
    type: 'date',
    nullable: false,
  })
  ExpiredAt: Date;
}

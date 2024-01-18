import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Post } from './Post';
import { Comment } from './Comment';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId!: number;

  @OneToMany(() => Post, (post) => post.author)
  posts!: Post[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments!: Post[];

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  salt!: string;

  @Column({ length: 20, default: 'user' })
  role!: string;

  @Column({ length: 20 })
  name!: string;

  @Column({ nullable: true })
  introduce!: string;

  @Column({ nullable: true })
  imageUrl!: string;

  @Column({ length: 50, nullable: true })
  slackId!: string;

  @Column({ length: 50, nullable: true })
  slackWorkspace!: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;
}

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Post } from './Post';
import { User } from './User';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  commentId!: number;

  @ManyToOne(() => Post, (post) => post.comments, {
    cascade: true
  })
  @JoinColumn({ name: 'post_id' })
  post!: Post;

  @ManyToOne(() => User, (user) => user.comments, {
    cascade: true
  })
  @JoinColumn({ name: 'author_id' })
  author!: User;

  @Column({ length: 50, default: '익명의 머쓱이' })
  nickname!: string;

  @Column({ length: 500 })
  content!: string;

  @Column({ length: 50 })
  imageName!: string;

  @Column()
  positionX!: number;

  @Column()
  positionY!: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;
}

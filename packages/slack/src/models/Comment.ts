import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Post } from './Post';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50 })
  author!: string;

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

  @ManyToOne(() => Post, (post) => post.comments, {
    cascade: true
  })
  post!: Post;
}

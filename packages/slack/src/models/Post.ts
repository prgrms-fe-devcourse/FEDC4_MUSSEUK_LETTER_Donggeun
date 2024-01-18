import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { Comment } from './Comment';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  postId!: number;

  @ManyToOne(() => User, (user) => user.posts, {
    cascade: true
  })
  @JoinColumn({ name: 'author_id' })
  author!: User;

  @OneToMany(() => Comment, (comment) => comment.commentId)
  comments!: Comment[];

  @Column({ length: 50 })
  title!: string;

  @Column({ length: 500 })
  content!: string;

  @Column({ length: 50, nullable: true })
  imageName!: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;
}

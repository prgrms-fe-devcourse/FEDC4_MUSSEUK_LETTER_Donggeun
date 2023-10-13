import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { User } from './User';
import { Comment } from './Comment';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50 })
  title!: string;

  @Column({ length: 500 })
  content!: string;

  @Column({ length: 50, nullable: true })
  imageName!: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.posts, {
    cascade: true
  })
  author!: User;

  @OneToMany(() => Comment, (comment) => comment.id)
  comments!: Comment[];
}

import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Post } from './Post';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50, unique: true })
  username!: string;

  @Column()
  password!: string;

  @Column()
  salt!: string;

  @Column({ length: 20 })
  role!: string;

  @Column({ length: 20 })
  name!: string;

  @Column()
  introduce!: string;

  @Column({ length: 50 })
  imageName!: string;

  @Column({ length: 50 })
  slackId!: string;

  @Column({ length: 20 })
  slackWorkspace!: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @OneToMany(() => Post, (post) => post.author)
  posts!: Post[];
}

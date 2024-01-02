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

  @Column({ length: 20, default: 'user' })
  role!: string;

  @Column({ length: 20 })
  name!: string;

  @Column({ nullable: true })
  introduce!: string;

  @Column({ length: 50, nullable: true })
  imageName!: string;

  @Column({ length: 50, nullable: true })
  slackId!: string;

  @Column({ length: 20, nullable: true })
  slackWorkspace!: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;

  @OneToMany(() => Post, (post) => post.author)
  posts!: Post[];
}

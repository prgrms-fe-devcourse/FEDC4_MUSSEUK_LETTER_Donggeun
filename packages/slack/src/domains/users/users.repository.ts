import AppDataSource from '@/configs/database';
import { User } from '@/models/User';

const UserRepository = AppDataSource.getRepository(User).extend({
  async findUserByUsername({ username }: { username: string }) {
    const user: Pick<
      User,
      'id' | 'username' | 'role' | 'name' | 'introduce' | 'imageName' | 'slackId' | 'slackWorkspace'
    > | null = await this.findOne({
      select: ['id', 'username', 'role', 'name', 'introduce', 'imageName', 'slackId', 'slackWorkspace'],
      where: { username }
    });

    return user;
  }
});

export default UserRepository;

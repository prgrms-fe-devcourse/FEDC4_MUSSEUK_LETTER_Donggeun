import AppDataSource from '@/configs/database';
import { User } from '@/models/User';

const UserRepository = AppDataSource.getRepository(User).extend({
  async findUserByEmail({ email }: { email: string }) {
    const user: Pick<
      User,
      'userId' | 'email' | 'role' | 'name' | 'introduce' | 'imageUrl' | 'slackId' | 'slackWorkspace'
    > | null = await this.findOne({
      select: ['userId', 'email', 'role', 'name', 'introduce', 'imageUrl', 'slackId', 'slackWorkspace'],
      where: { email }
    });

    return user;
  }
});

export default UserRepository;

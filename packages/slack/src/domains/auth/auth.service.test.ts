import authService from './auth.service';
import UserRepository from '@/domains/users/users.repository';
import { encryptText } from '@/utils/crypto';
jest.mock('@/domains/users/users.repository');

describe('로그인', () => {
  it('로그인 성공', async () => {
    const mockUser = { id: 1, password: encryptText('12341234', '시크릿'), salt: '시크릿' };
    UserRepository.findOneBy = jest.fn().mockResolvedValueOnce(mockUser);

    const user = await authService.signIn('아이디', '12341234');

    expect(user.userId).toBe(mockUser.id);
  });

  it('존재하지 않는 회원일 경우 예외 발생', async () => {
    UserRepository.findOneBy = jest.fn().mockResolvedValueOnce(null);

    expect(authService.signIn('아이디', '12341234')).rejects.toThrow();
  });

  it('비밀번호가 일치하지 않을 경우 예외 발생', async () => {
    const mockUser = { id: 1, password: encryptText('12341234', '시크릿'), salt: '시크릿' };
    UserRepository.findOneBy = jest.fn().mockResolvedValueOnce(mockUser);

    expect(authService.signIn('아이디', '11112222')).rejects.toThrow();
  });
});

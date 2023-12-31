import authService from './auth.service';
import UserRepository from '@/domains/users/users.repository';
import { encryptText } from '@/utils/crypto';
jest.mock('@/domains/users/users.repository');

describe('회원가입', () => {
  const mockUser = { id: 1, username: '아이디', password: '12341234', name: '이름' };

  it('회원가입 성공', async () => {
    UserRepository.findUserByUsername = jest.fn().mockResolvedValueOnce(mockUser);

    const user = await authService.signUp(mockUser.username, mockUser.password, mockUser.name);

    expect(user.userId).toBe(mockUser.id);
  });

  it('이미 존재하는 회원일 경우 예외 발생', async () => {
    UserRepository.findOneBy = jest.fn().mockResolvedValueOnce(mockUser);

    expect(authService.signUp(mockUser.username, mockUser.password, mockUser.name)).rejects.toThrow();
  });

  it('생성된 유저 정보를 찾을 수 없을 경우 예외 발생', async () => {
    UserRepository.findUserByUsername = jest.fn().mockResolvedValueOnce(null);

    expect(authService.signUp(mockUser.username, mockUser.password, mockUser.name)).rejects.toThrow();
  });
});

describe('로그인', () => {
  const mockUser = { id: 1, password: encryptText('12341234', '시크릿'), salt: '시크릿' };

  it('로그인 성공', async () => {
    UserRepository.findOneBy = jest.fn().mockResolvedValueOnce(mockUser);

    const user = await authService.signIn('아이디', '12341234');

    expect(user.userId).toBe(mockUser.id);
  });

  it('존재하지 않는 회원일 경우 예외 발생', async () => {
    UserRepository.findOneBy = jest.fn().mockResolvedValueOnce(null);

    expect(authService.signIn('아이디', '12341234')).rejects.toThrow();
  });

  it('비밀번호가 일치하지 않을 경우 예외 발생', async () => {
    UserRepository.findOneBy = jest.fn().mockResolvedValueOnce(mockUser);

    expect(authService.signIn('아이디', '11112222')).rejects.toThrow();
  });
});

describe('로그인 확인', () => {
  const mockUser = { id: 1 };

  it('로그인 확인 성공', async () => {
    UserRepository.findOneBy = jest.fn().mockResolvedValueOnce(mockUser);

    const user = await authService.signCheck(mockUser.id);

    expect(user.userId).toBe(mockUser.id);
  });

  it('DB에 유저 정보가 없을 경우 예외 발생', async () => {
    UserRepository.findOneBy = jest.fn().mockResolvedValueOnce(null);

    expect(authService.signCheck(mockUser.id)).rejects.toThrow();
  });
});

describe('비밀번호 변경', () => {
  it('DB에 유저 정보가 없을 경우 예외 발생', async () => {
    UserRepository.findOneBy = jest.fn().mockResolvedValueOnce(null);

    expect(authService.changePassword(1, '12341234')).rejects.toThrow();
  });
});

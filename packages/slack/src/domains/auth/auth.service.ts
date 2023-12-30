import UserRepository from '@/domains/users/users.repository';
import { ResponseError } from '@/utils/ResponseError';
import { makeRandomString, encryptText } from '@/utils/crypto';

const authService = {
  async signup(username: string, password: string, name: string) {
    if (await UserRepository.findOneBy({ username })) {
      throw new ResponseError(409, '이미 존재하는 회원입니다.');
    }

    const salt = makeRandomString(64);
    const encryptedPassword = encryptText(password, salt);

    await UserRepository.insert({
      name,
      username,
      password: encryptedPassword,
      salt: salt
    });

    const insertedUser = await UserRepository.findUserByUsername({ username });

    if (!insertedUser) {
      throw new ResponseError(500, '회원가입에 실패했습니다.');
    }

    // TODO: 토큰 발급 로직 작성해야함.
    this.generateJWTToken();

    return insertedUser;
  },

  async generateJWTToken() {
    // TODO: 토큰 발급 로직 작성해야함.
  }
};

export default authService;
